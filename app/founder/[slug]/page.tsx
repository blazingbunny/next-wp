import { notFound } from "next/navigation";
import Image from "next/image";
import {
  getFounderBySlug,
  getFounderBySlugNoCache,
  getAllFounders,
  getFeaturedMediaById,
} from "@/lib/wordpress";
import { Section } from "@/components/section";
import { Container } from "@/components/container";
import { Card } from "@/components/ui/card";
import { FadeIn } from "@/components/animations/fade-in";
import { Facebook, Mail, Link2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { siteConfig } from "@/site.config";

import type { Metadata } from "next";

// Revalidate pages every hour
export const revalidate = 3600;

export async function generateStaticParams() {
  // Fetch all founder custom posts and return their slugs for static generation
  const founders = await getAllFounders();
  return founders.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  // Use a no-cache fetch here to ensure we pick up ACF changes immediately
  const page = await getFounderBySlugNoCache(slug);

  if (!page) {
    return {};
  }
  // Build description (prefer ACF description, then excerpt)
  let description = null as string | null;
  // ACF fields (if the WP site exposes them) often appear on `page.acf`
  if ((page as any).acf && (page as any).acf.description) {
    description = String((page as any).acf.description).replace(/<[^>]*>/g, "").trim();
  } else if (page.excerpt?.rendered) {
    description = page.excerpt.rendered.replace(/<[^>]*>/g, "").trim();
  } else if (page.content?.rendered) {
    description = page.content.rendered.replace(/<[^>]*>/g, "").trim().slice(0, 200) + "...";
  }

  // Prefer featured media for OG image when available
  let ogImage: string | null = null;
  if (page?.featured_media) {
    try {
      const fm = await getFeaturedMediaById(page.featured_media);
      if (fm?.source_url) ogImage = fm.source_url;
    } catch (e) {
      // ignore media fetch errors and fall back to generated OG
    }
  }

  const defaultOgUrl = new URL(`${siteConfig.site_domain}/api/og`);
  defaultOgUrl.searchParams.append("title", page.title.rendered);
  if (description) defaultOgUrl.searchParams.append("description", description);

  const ogImageUrl = ogImage ?? defaultOgUrl.toString();

  return {
    title: page.title.rendered,
  description: description ?? undefined,
    openGraph: {
      title: page.title.rendered,
  description: description ?? undefined,
      type: "article",
      url: `${siteConfig.site_domain}/founder/${page.slug}`,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: page.title.rendered,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title.rendered,
  description: description ?? undefined,
      images: [ogImageUrl],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = await getFounderBySlugNoCache(slug);
  if (!page) return notFound();

  // Fetch featured media if available
  let featuredMedia = null as any;
  if (page.featured_media) {
    try {
      featuredMedia = await getFeaturedMediaById(page.featured_media);
    } catch (e) {
      featuredMedia = null;
    }
  }

  let description = null as string | null;
  if ((page as any).acf && (page as any).acf.description) {
    description = String((page as any).acf.description).replace(/<[^>]*>/g, "").trim();
  } else if (page.excerpt?.rendered) {
    description = page.excerpt.rendered.replace(/<[^>]*>/g, "").trim();
  }

  return (
    <>
      {/* Hero Section */}
      <Section className="bg-surface pt-32">
        <Container>
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="flex-1 space-y-6">
              <FadeIn>
                <h1 className="text-4xl md:text-5xl font-bold" dangerouslySetInnerHTML={{ __html: page.title.rendered }} />
              </FadeIn>
              {description && (
                <FadeIn delay={200}>
                  <p className="text-xl text-muted-foreground">{description}</p>
                </FadeIn>
              )}
              {((page as any).acf || {}) && (
                <FadeIn delay={400}>
                  <div className="flex flex-wrap gap-4">
                    {/* Social Media Links */}
                    {(page as any).acf.facebook_profile && (
                      <a
                        href={(page as any).acf.facebook_profile}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                      >
                        <Facebook className="h-5 w-5" />
                        <span>Facebook</span>
                      </a>
                    )}
                    {(page as any).acf.email && (
                      <a
                        href={`mailto:${(page as any).acf.email}`}
                        className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                      >
                        <Mail className="h-5 w-5" />
                        <span>Email</span>
                      </a>
                    )}
                    {(page as any).acf.website && (
                      <a
                        href={(page as any).acf.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                      >
                        <Link2 className="h-5 w-5" />
                        <span>Website</span>
                      </a>
                    )}
                  </div>
                </FadeIn>
              )}
            </div>
            {featuredMedia?.source_url && (
              <FadeIn delay={200}>
                <div className="relative w-[280px] h-[280px] lg:w-[400px] lg:h-[400px] rounded-2xl overflow-hidden">
                  <Image
                    src={featuredMedia.source_url}
                    alt={featuredMedia.alt_text || page.title.rendered}
                    fill
                    sizes="(max-width: 1024px) 280px, 400px"
                    className="object-cover"
                    priority
                  />
                </div>
              </FadeIn>
            )}
          </div>
        </Container>
      </Section>

      {/* Content Section */}
      <Section>
        <Container>
          <div className="grid lg:grid-cols-[1fr_300px] gap-12">
            <FadeIn>
              <Card className="prose dark:prose-invert max-w-none">
                <div dangerouslySetInnerHTML={{ __html: page.content.rendered }} />
              </Card>
            </FadeIn>
            
            <div className="space-y-6">
              {((page as any).acf || {}) && (
                <FadeIn delay={200}>
                  <Card>
                    <h3 className="text-lg font-bold mb-4">Details</h3>
                    <div className="space-y-4">
                      {Object.entries((page as any).acf)
                        .filter(([key, value]) =>
                          !["description", "name", "facebook_profile", "email", "website"].includes(key)
                        )
                        .map(([key, value]) =>
                          value ? (
                            <div key={key}>
                              <Badge variant="secondary" className="mb-1">
                                {key.replace(/_/g, " ")}
                              </Badge>
                              <p className="text-sm">{String(value)}</p>
                            </div>
                          ) : null
                        )}
                    </div>
                  </Card>
                </FadeIn>
              )}
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
