const releaseRobotsTxt = `# The Reporter content is made available for your personal, non-commercial
# use subject to our Terms of Service.
# Use of any device, tool, or process designed to data mine or scrape the content
# using automated means is prohibited without prior written permission from
# The Reporter. Prohibited uses include but are not limited to:
# (1) text and data mining activities under Art. 4 of the EU Directive on Copyright in
# the Digital Single Market;
# (2) the training, fine-tuning, evaluation, development, or reproduction of any software,
# machine learning, artificial intelligence (AI), and/or large language models (LLMs);
# (3) creating or providing archived or cached data sets containing our content to others; and/or
# (4) any commercial purposes.
# Licensing arrangements for AI-related use or text/data mining may be available
# through separate agreements. Contact contact@twreporter.org for assistance.

# Disallow Rules

User-agent: AliyunSecBot
Disallow: /

User-agent: AmazonBot
Disallow: /

User-agent: anthropic-ai
Disallow: /

User-agent: Applebot-Extended
Disallow: /

User-agent: AudigentAdBot
Disallow: /

User-agent: AwarioRssBot
User-agent: AwarioSmartBot
Disallow: /

User-agent: BLEXBot
Disallow: /

User-agent: Bytespider
Disallow: /

User-agent: CCBot
Disallow: /

User-agent: ClaudeBot
Disallow: /

User-agent: cohere-ai
Disallow: /

User-agent: DataForSeoBot
Disallow: /

User-agent: Diffbot
Disallow: /

User-agent: EchoboxBot
Disallow: /

User-agent: FacebookBot
Disallow: /

User-agent: FriendlyCrawler
Disallow: /

User-agent: Google-CloudVertexBot
Disallow: /

User-agent: Google-Extended
Disallow: /

User-agent: GPTBot
Disallow: /

User-agent: ImagesiftBot
Disallow: /

User-agent: Jetslide
Disallow: /

User-agent: magpie-crawler
Disallow: /

User-agent: meta-externalagent
Disallow: /

User-agent: meta-externalfetcher
Disallow: /

User-agent: meta-webindexer
Disallow: /

User-agent: MyCentralAIScraperBot
Disallow: /

User-agent: NewsNow
Disallow: /

User-agent: news-please
Disallow: /

User-agent: omgili
Disallow: /

User-agent: omgilibot
Disallow: /

User-agent: peer39_crawler
Disallow: /

User-agent: Poseidon Research Crawler
Disallow: /

User-agent: quillbot.com
Disallow: /

User-agent: Quora-Bot
Disallow: /

User-agent: Scrapy
Disallow: /

User-agent: SeekrBot
Disallow: /

User-agent: SeznamHomepageCrawler
Disallow: /

User-agent: TaraGroup Intelligent Bot
Disallow: /

User-agent: Timpibot
Disallow: /

User-agent: TurnitinBot
Disallow: /

User-agent: ViennaTinyBot
Disallow: /

User-agent: YouBot
Disallow: /

# Allow search and citation use
User-agent: OAI-SearchBot
Allow: /

User-agent: *
Allow: /

Sitemap: https://public.twreporter.org/sitemaps/www-sitemap.xml
Sitemap: https://www.twreporter.org/sitemaps/index-articles.xml`

export default releaseRobotsTxt
