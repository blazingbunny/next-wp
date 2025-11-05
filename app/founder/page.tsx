import { getAllFounders, getFeaturedMediaById } from "@/lib/wordpress";
import { Section } from "@/components/section";
import { Container } from "@/components/container";
import { SectionTitle } from "@/components/ui/section-title";
import { Card } from "@/components/ui/card";
import { Grid } from "@/components/ui/grid";
import { FadeIn } from "@/components/animations/fade-in";
import Link from "next/link";
import Image from "next/image";

export default async function FoundersPage() {
  const founders = await getAllFounders();

  // Fetch featured media for each founder
  const foundersWithMedia = await Promise.all(
    founders.map(async (founder) => {
      if (!founder.featured_media) return { ...founder, featuredMedia: null };
      try {
        const media = await getFeaturedMediaById(founder.featured_media);
        return { ...founder, featuredMedia: media };
      } catch {
        return { ...founder, featuredMedia: null };
      }
    })
  );

  return (
    <>
      <Section className="bg-surface pt-32">
        <Container>
          <FadeIn>
            <SectionTitle
              title="Our Founders"
              subtitle="Meet the talented individuals who make it all possible."
              align="left"
            />
          </FadeIn>
        </Container>
      </Section>

      <Section>
        <Container>
          <Grid cols={3}>
            {foundersWithMedia.map((founder, index) => (
              <FadeIn key={founder.id} delay={index * 200}>
                <Link href={`/founder/${founder.slug}`}>
                  <Card hoverable className="group">
                    {founder.featuredMedia?.source_url ? (
                      <div className="relative w-full h-[300px] rounded-lg overflow-hidden mb-6">
                        <Image
                          src={founder.featuredMedia.source_url}
                          alt={founder.featuredMedia.alt_text || founder.title.rendered}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                    ) : null}
                    <h3 
                      className="text-xl font-bold mb-2"
                      dangerouslySetInnerHTML={{ __html: founder.title.rendered }}
                    />
                    {(founder as any).acf?.role && (
                      <p className="text-muted-foreground">
                        {(founder as any).acf.role}
                      </p>
                    )}
                  </Card>
                </Link>
              </FadeIn>
            ))}
          </Grid>
        </Container>
      </Section>
    </>
  );
}