const fs = require('fs');
const path = require('path');

// 30篇精选文章定义（真实SEO关键词+高CPC）
const ARTICLES = [
  // PILOT (6篇)
  { slug: 'life-insurance-commercial-pilots-2024-guide', cat: 'pilot', catName: 'Pilot Insurance', title: 'Life Insurance for Commercial Pilots: 2024 Rates, Companies & Expert Guide', metaDesc: 'Do commercial pilots pay more for life insurance? Real 2024 rates from top carriers, how aviation exclusions work, and which companies offer the best deals for airline pilots.', keywords: 'life insurance for commercial pilots, pilot life insurance rates, aviation life insurance', readTime: 14 },
  { slug: 'do-pilots-pay-more-life-insurance', cat: 'pilot', catName: 'Pilot Insurance', title: 'Do Pilots Pay More for Life Insurance? The Truth Behind Aviation Premiums', metaDesc: 'Most commercial pilots qualify for standard or preferred life insurance rates. Here are the real numbers, which factors matter, and how to avoid overpaying.', keywords: 'do pilots pay more for life insurance, pilot insurance premiums, airline pilot life insurance cost', readTime: 11 },
  { slug: 'aviation-exclusion-clause-life-insurance', cat: 'pilot', catName: 'Pilot Insurance', title: 'Aviation Exclusion Clauses Explained: What Every Pilot Must Know Before Signing', metaDesc: 'Aviation exclusion clauses can leave your family unprotected. Learn exactly what they mean, when they apply, and how to get a policy without one.', keywords: 'aviation exclusion clause, pilot life insurance exclusion, aviation life insurance no exclusion', readTime: 9 },
  { slug: 'best-life-insurance-companies-pilots-2024', cat: 'pilot', catName: 'Pilot Insurance', title: 'Best Life Insurance Companies for Pilots in 2024: Ranked & Honestly Reviewed', metaDesc: 'We compared 10 life insurance companies on pilot-specific underwriting, aviation exclusions, premiums, and claims. Here are the top picks for commercial and private pilots.', keywords: 'best life insurance for pilots, life insurance companies for pilots, pilot life insurance comparison', readTime: 13 },
  { slug: 'pilot-disability-insurance-guide', cat: 'pilot', catName: 'Pilot Insurance', title: 'Pilot Disability Insurance: What Happens If You\'re Medically Grounded?', metaDesc: 'A medical certificate suspension can end your flying career overnight. This guide covers own-occupation disability insurance for pilots, real costs, and top companies.', keywords: 'pilot disability insurance, aviation disability insurance, pilot income protection insurance', readTime: 12 },
  { slug: 'term-vs-whole-life-insurance-pilots', cat: 'pilot', catName: 'Pilot Insurance', title: 'Term vs. Whole Life Insurance for Pilots: Which Makes More Financial Sense?', metaDesc: 'Should pilots buy term or whole life insurance? An honest cost comparison with real examples for airline captains, first officers, and private pilots.', keywords: 'term life insurance pilots, whole life insurance pilots, pilot insurance comparison', readTime: 10 },

  // DOCTOR (6篇)
  { slug: 'physician-life-insurance-complete-guide', cat: 'doctor', catName: 'Physician Insurance', title: 'Life Insurance for Physicians: The Complete Guide for Medical Professionals (2024)', metaDesc: 'Doctors face unique insurance challenges: high student debt, late peak earnings, and demanding schedules. This guide covers every coverage decision physicians face.', keywords: 'physician life insurance, life insurance for doctors, doctor life insurance guide', readTime: 15 },
  { slug: 'physician-disability-insurance-own-occupation', cat: 'doctor', catName: 'Physician Insurance', title: 'Own-Occupation Disability Insurance for Physicians: Why This Definition Saves Everything', metaDesc: 'The difference between "own occupation" and "any occupation" disability coverage could cost a physician $120,000+ per year. Here\'s what every doctor needs to know.', keywords: 'physician disability insurance own occupation, doctor disability insurance, physician income protection', readTime: 12 },
  { slug: 'best-disability-insurance-doctors-2024', cat: 'doctor', catName: 'Physician Insurance', title: 'Best Disability Insurance Companies for Doctors in 2024: Guardian vs MassMutual vs Principal', metaDesc: 'We compared the top disability insurance carriers for physicians on definition of disability, specialty riders, premium stability, and claims reputation. Real rankings inside.', keywords: 'best disability insurance for doctors, physician disability insurance companies, Guardian MassMutual disability insurance', readTime: 14 },
  { slug: 'medical-malpractice-insurance-guide-2024', cat: 'doctor', catName: 'Physician Insurance', title: 'Medical Malpractice Insurance: Everything Doctors Need to Know in 2024', metaDesc: 'Claims-made vs. occurrence policies, tail coverage costs, and risk management strategies for physicians. A complete guide to malpractice insurance.', keywords: 'medical malpractice insurance, physician malpractice insurance, claims-made vs occurrence policy', readTime: 13 },
  { slug: 'resident-physician-life-insurance-guide', cat: 'doctor', catName: 'Physician Insurance', title: 'Life Insurance During Medical Residency: Why Buying Now Saves You Thousands', metaDesc: 'Residents are young, healthy, and eligible for excellent rates. Waiting until attending pay kicks in will cost significantly more. Here\'s how to buy smart during residency.', keywords: 'resident physician life insurance, life insurance medical residency, resident doctor insurance', readTime: 10 },
  { slug: 'how-much-life-insurance-do-doctors-need', cat: 'doctor', catName: 'Physician Insurance', title: 'How Much Life Insurance Does a Doctor Actually Need? The Full Calculation', metaDesc: 'Student loans, mortgage, future income, and family needs all factor in. We walk through the real numbers for physicians at every career stage with specific examples.', keywords: 'how much life insurance do doctors need, physician life insurance amount, doctor coverage amount', readTime: 11 },

  // LAWYER (6篇)
  { slug: 'attorney-life-insurance-guide-2024', cat: 'lawyer', catName: 'Attorney Insurance', title: 'Life Insurance for Attorneys: The Complete 2024 Guide for Legal Professionals', metaDesc: 'Lawyers face unique insurance pressures: student debt, variable income, and partnership obligations. This guide covers every coverage decision attorneys face.', keywords: 'life insurance for attorneys, lawyer life insurance, attorney life insurance guide', readTime: 14 },
  { slug: 'attorney-professional-liability-insurance', cat: 'lawyer', catName: 'Attorney Insurance', title: 'Attorney Professional Liability Insurance: What Every Lawyer Must Carry in 2024', metaDesc: 'One malpractice claim can end a legal career. We explain E&O coverage limits, claims-made vs occurrence, tail coverage, and what happens when you change firms.', keywords: 'attorney professional liability insurance, lawyer malpractice insurance, legal malpractice coverage', readTime: 12 },
  { slug: 'law-firm-partner-life-insurance-buy-sell', cat: 'lawyer', catName: 'Attorney Insurance', title: 'Life Insurance for Law Firm Partners: Buy-Sell Agreements & Key Person Coverage Explained', metaDesc: 'When a partner dies without proper planning, law firms face financial crisis. We explain how to structure buy-sell funding and key person policies for law practices.', keywords: 'law firm partner life insurance, attorney buy-sell agreement, law firm key person insurance', readTime: 12 },
  { slug: 'solo-attorney-insurance-checklist', cat: 'lawyer', catName: 'Attorney Insurance', title: 'The Solo Practice Attorney Insurance Checklist: Every Policy You Need in 2024', metaDesc: 'Solo lawyers lack big-firm safety nets. Here is every insurance policy an independent attorney should have, with real costs and priorities for every budget level.', keywords: 'solo attorney insurance, solo practitioner lawyer insurance, independent attorney insurance checklist', readTime: 11 },
  { slug: 'disability-insurance-for-lawyers', cat: 'lawyer', catName: 'Attorney Insurance', title: 'Disability Insurance for Lawyers: Protecting Your Income When You Can\'t Practice', metaDesc: 'A disability that prevents legal practice can cost millions in future earnings. We explain which policies provide true own-occupation protection for attorneys.', keywords: 'disability insurance for lawyers, attorney disability insurance, lawyer income protection', readTime: 11 },
  { slug: 'how-much-life-insurance-do-lawyers-need', cat: 'lawyer', catName: 'Attorney Insurance', title: 'How Much Life Insurance Does a Lawyer Need? A Practical Calculation for 2024', metaDesc: 'Income level, student debt, firm obligations, and family circumstances all affect the answer. A step-by-step calculation for associates, partners, and solo practitioners.', keywords: 'how much life insurance do lawyers need, attorney life insurance amount, lawyer coverage calculation', readTime: 10 },

  // CONTRACTOR (6篇)
  { slug: 'contractor-general-liability-insurance-guide', cat: 'contractor', catName: 'Contractor Insurance', title: 'General Liability Insurance for Contractors: Complete 2024 Buyer\'s Guide', metaDesc: 'Without GL coverage, one accident can bankrupt your contracting business. Real cost breakdowns, coverage limits explained, and how to avoid the policies that leave you exposed.', keywords: 'general liability insurance for contractors, contractor liability insurance, contractor insurance guide', readTime: 13 },
  { slug: 'self-employed-contractor-life-insurance', cat: 'contractor', catName: 'Contractor Insurance', title: 'Life Insurance for Self-Employed Contractors: Protecting Your Family Without HR Benefits', metaDesc: 'Self-employed contractors have no employer safety net. We explain how much coverage you need, what it actually costs, and the most affordable ways to get it.', keywords: 'self employed contractor life insurance, independent contractor life insurance, freelancer life insurance', readTime: 11 },
  { slug: 'contractor-disability-insurance-guide', cat: 'contractor', catName: 'Contractor Insurance', title: 'Disability Insurance for Contractors: What Happens to Your Income If You Can\'t Work?', metaDesc: 'A job site injury can stop your income overnight. We compare disability insurance options for independent contractors, sole proprietors, and small construction businesses.', keywords: 'contractor disability insurance, self employed disability insurance, contractor income protection', readTime: 10 },
  { slug: 'roofer-electrician-plumber-insurance', cat: 'contractor', catName: 'Contractor Insurance', title: 'Insurance for Roofers, Electricians & Plumbers: What High-Risk Trades Actually Need', metaDesc: 'High-risk trades need specialized coverage that generic policies miss. We break down exactly what roofers, electricians, and plumbers need — with real premium examples.', keywords: 'roofer insurance, electrician insurance, plumber insurance, trade contractor insurance', readTime: 11 },
  { slug: 'cheapest-liability-insurance-contractors', cat: 'contractor', catName: 'Contractor Insurance', title: 'How to Get the Cheapest Liability Insurance as a Contractor Without Cutting Corners', metaDesc: 'Bundling policies, adjusting deductibles, and choosing the right carrier can cut your premiums 20-40%. Every legitimate cost-reduction strategy for contractors explained.', keywords: 'cheapest liability insurance contractors, affordable contractor insurance, cheap contractor liability insurance', readTime: 10 },
  { slug: 'workers-comp-vs-disability-contractors', cat: 'contractor', catName: 'Contractor Insurance', title: 'Workers\' Comp vs. Disability Insurance for Contractors: Critical Differences Explained', metaDesc: 'Many contractors confuse workers\' comp with personal disability insurance and end up with dangerous gaps in coverage. Here\'s exactly how each works and what you need.', keywords: 'workers comp vs disability insurance, contractor workers compensation, contractor disability insurance difference', readTime: 9 },

  // SENIOR (6篇)
  { slug: 'life-insurance-seniors-over-65-guide', cat: 'senior', catName: 'Senior Insurance', title: 'Life Insurance for Seniors Over 65: Every Option Honestly Compared (2024)', metaDesc: 'Buying life insurance after 65 is fundamentally different. We explain final expense, guaranteed issue, term, and whole life options with real costs and honest recommendations.', keywords: 'life insurance for seniors over 65, senior life insurance, life insurance after 65', readTime: 14 },
  { slug: 'final-expense-insurance-seniors-guide', cat: 'senior', catName: 'Senior Insurance', title: 'Final Expense Insurance for Seniors: Honest 2024 Comparison of Real Policies', metaDesc: 'Final expense policies are marketed heavily to seniors but not all are good deals. We break down costs, coverage limits, graded benefit periods, and red flags to avoid.', keywords: 'final expense insurance seniors, burial insurance seniors, final expense life insurance', readTime: 11 },
  { slug: 'medicare-supplement-plans-comparison-2024', cat: 'senior', catName: 'Senior Insurance', title: 'Medicare Supplement Plans Compared: Plan G vs Plan N vs Plan F (2024)', metaDesc: 'Medicare leaves significant gaps. Medigap Plans G, N, and F each work differently. We compare coverage, costs, and which plan makes sense for different situations.', keywords: 'Medicare supplement plans comparison, Medigap Plan G vs N, best Medicare supplement plan 2024', readTime: 15 },
  { slug: 'long-term-care-insurance-seniors-2024', cat: 'senior', catName: 'Senior Insurance', title: 'Long-Term Care Insurance in 2024: Do Seniors Still Need It? An Honest Analysis', metaDesc: 'LTC premiums have skyrocketed. We examine whether traditional long-term care insurance, hybrid policies, or self-insuring makes the most financial sense for seniors today.', keywords: 'long term care insurance 2024, senior long term care insurance, LTC insurance worth it', readTime: 13 },
  { slug: 'guaranteed-issue-life-insurance-seniors', cat: 'senior', catName: 'Senior Insurance', title: 'Guaranteed Issue Life Insurance for Seniors: Who It\'s For and When to Avoid It', metaDesc: 'No medical exam sounds appealing — but guaranteed issue policies have serious limitations including graded benefit periods. Here\'s when they make sense and when they don\'t.', keywords: 'guaranteed issue life insurance seniors, no exam life insurance seniors, guaranteed acceptance life insurance', readTime: 10 },
  { slug: 'life-insurance-seniors-health-problems', cat: 'senior', catName: 'Senior Insurance', title: 'Life Insurance for Seniors with Health Problems: Real Options for 2024', metaDesc: 'Diabetes, heart disease, or cancer history doesn\'t automatically disqualify you. We explain how to find coverage despite health issues and what underwriters actually look for.', keywords: 'life insurance seniors health problems, life insurance diabetes seniors, life insurance heart disease seniors', readTime: 11 },
];

const CATEGORY_INFO = {
  pilot:      { icon: '✈️', color: '#1a3a6b', accent: '#4f8ef7', tag: 'tag-pilot' },
  doctor:     { icon: '🩺', color: '#0d3e1f', accent: '#5fdd9d', tag: 'tag-doctor' },
  lawyer:     { icon: '⚖️', color: '#3e1f0d', accent: '#ffb347', tag: 'tag-lawyer' },
  contractor: { icon: '🔨', color: '#1f0d3e', accent: '#c084fc', tag: 'tag-contractor' },
  senior:     { icon: '🌿', color: '#0d2e3e', accent: '#67d8ef', tag: 'tag-senior' },
};

async function generateArticleContent(article) {
  const prompt = `You are an expert insurance writer with 15 years of experience. Write a comprehensive, genuinely helpful article for insurejoy.top about: "${article.title}"

REQUIREMENTS:
- Write for a US audience, targeting professionals who need real information
- Include REAL insurance company names (Guardian, MassMutual, Northwestern Mutual, Principal, Mutual of Omaha, New York Life, Prudential, MetLife, AIG, Transamerica, etc.)
- Include REAL approximate premium ranges based on actual market data
- Include REAL facts about the insurance industry
- Write in a warm, authoritative, first-person journalistic style
- Sound like a knowledgeable human expert, NOT an AI or corporate writer
- Include personal anecdotes and real scenarios
- Be honest about trade-offs and limitations

STRUCTURE (use these exact HTML tags):
<p class="article-lead">[Opening hook - a real scenario or surprising fact, 2-3 sentences]</p>

<p>[Context paragraph - why this matters for the reader]</p>

<h2>[Section heading with real keyword]</h2>
<p>[Content with real data, company names, and specific numbers]</p>

[Continue with 6-8 sections total, each with h2 and 2-4 paragraphs]

Include:
- At least one <blockquote><p>[real-sounding expert quote]</p><cite>— [Name, Title, Company/Organization]</cite></blockquote>
- One comparison table: <table class="data-table"><thead>...</thead><tbody>...</tbody></table>
- Multiple <ul> or <ol> lists with specific actionable items
- A <div class="highlight-box"><h4>Key Takeaway</h4><p>...</p></div>
- End with <h2>Frequently Asked Questions</h2> section with 4 real questions and detailed answers using <h3> for each question

CONTENT RULES:
- Minimum 1,200 words of body content
- Use <strong> for important terms and numbers
- Premium ranges should be realistic (e.g., "$45-$120/month for a healthy 40-year-old")
- Mention specific policy types, riders, and underwriting factors
- Be honest about what the article cannot replace (professional advice)
- Do NOT use placeholder text or [brackets] in the final content
- Write the complete article, not an outline

Category: ${article.catName}
Target keywords: ${article.keywords}
Reading level: Professional adult`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 4000,
        messages: [{ role: 'user', content: prompt }]
      })
    });
    const data = await response.json();
    if (data.content && data.content[0]) return data.content[0].text;
    throw new Error('No content returned');
  } catch (e) {
    return `<p class="article-lead">Content generation in progress. Please check back shortly.</p>`;
  }
}

module.exports = { ARTICLES, CATEGORY_INFO, generateArticleContent };
