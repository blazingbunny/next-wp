import { Container } from "@/components/container";
import { Section } from "@/components/section";
import { SectionTitle } from "@/components/ui/section-title";
import { Card } from "@/components/ui/card";
import { Grid } from "@/components/ui/grid";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/animations/fade-in";
import Link from "next/link";
import { ArrowRight, Code, Laptop, BarChart, MessageSquare, Mail } from "lucide-react";
import { siteConfig } from "@/site.config";

// This page is using the craft.tsx component and design system
export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <Section className="bg-surface pt-32">
        <Container>
          <div className="flex flex-col items-center text-center space-y-8">
            <FadeIn>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold max-w-3xl">
                Build WordPress Sites with{" "}
                <span className="text-primary">Next.js</span>
              </h1>
            </FadeIn>
            <FadeIn delay={200}>
              <p className="text-xl text-muted-foreground max-w-2xl">
                {siteConfig.site_description}
              </p>
            </FadeIn>
            <FadeIn delay={400}>
              <div className="flex gap-4">
                <Button asChild size="lg">
                  <Link href="/docs">
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/posts">View Examples</Link>
                </Button>
              </div>
            </FadeIn>
          </div>
        </Container>
      </Section>

      {/* Features Section */}
      <Section>
        <Container>
          <FadeIn>
            <SectionTitle
              title="Why Next-WP?"
              subtitle="Next-WP combines the power of WordPress with modern development tools."
            />
          </FadeIn>
          <Grid className="mt-12">
            <FadeIn delay={200}>
              <Card hoverable>
                <Code className="h-10 w-10 text-primary mb-6" />
                <h3 className="text-xl font-bold mb-2">Modern Development</h3>
                <p className="text-muted-foreground">
                  Use TypeScript, React, and modern tooling while keeping WordPress as your CMS.
                </p>
              </Card>
            </FadeIn>
            <FadeIn delay={400}>
              <Card hoverable>
                <Laptop className="h-10 w-10 text-primary mb-6" />
                <h3 className="text-xl font-bold mb-2">Easy Integration</h3>
                <p className="text-muted-foreground">
                  Simple setup process with pre-built components and WordPress integration.
                </p>
              </Card>
            </FadeIn>
            <FadeIn delay={600}>
              <Card hoverable>
                <BarChart className="h-10 w-10 text-primary mb-6" />
                <h3 className="text-xl font-bold mb-2">High Performance</h3>
                <p className="text-muted-foreground">
                  Get blazing fast page loads with server-side rendering and static generation.
                </p>
              </Card>
            </FadeIn>
          </Grid>
        </Container>
      </Section>

      {/* Contact Section */}
      <Section className="bg-surface">
        <Container>
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="flex-1 space-y-6">
              <FadeIn>
                <SectionTitle
                  title="Get in Touch"
                  subtitle="Have questions? We're here to help you get started with Next-WP."
                  align="left"
                />
              </FadeIn>
              <div className="flex flex-col gap-4">
                <FadeIn delay={200}>
                  <Card variant="outline" className="flex items-start gap-4">
                    <MessageSquare className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <h4 className="font-bold mb-1">Documentation</h4>
                      <p className="text-muted-foreground">
                        Check out our comprehensive guides and API documentation.
                      </p>
                    </div>
                  </Card>
                </FadeIn>
                <FadeIn delay={400}>
                  <Card variant="outline" className="flex items-start gap-4">
                    <Mail className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <h4 className="font-bold mb-1">Email Support</h4>
                      <p className="text-muted-foreground">
                        Get help directly from our development team.
                      </p>
                    </div>
                  </Card>
                </FadeIn>
              </div>
            </div>
            <FadeIn delay={600}>
              <Card className="flex-1 w-full">
                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-3 py-2 bg-background border rounded-lg"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-3 py-2 bg-background border rounded-lg"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      className="w-full px-3 py-2 bg-background border rounded-lg"
                    ></textarea>
                  </div>
                  <Button className="w-full">Send Message</Button>
                </form>
              </Card>
            </FadeIn>
          </div>
        </Container>
      </Section>
    </>
  );
}
