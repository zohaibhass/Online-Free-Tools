export const reviewedHealthPosts: Record<string, { title: string; description: string; content: string }> = {
  'bmi-chart-men-women': {
    title: 'Adult BMI Chart for Men and Women: Categories and Limitations',
    description: 'Read the standard adult BMI categories, why they are the same for men and women, and what BMI can and cannot tell you.',
    content: `
      <h2>The adult BMI categories</h2>
      <p>Body mass index (BMI) compares weight with height. For adults age 20 and older, the standard categories are the same regardless of sex: below 18.5 is underweight, 18.5 to less than 25 is healthy weight, 25 to less than 30 is overweight, and 30 or greater is obesity. These labels describe a screening result; they are not a diagnosis or a direct measurement of body fat.</p>
      <table style="width:100%;border-collapse:collapse"><thead><tr><th style="text-align:left;padding:8px">Adult category</th><th style="text-align:left;padding:8px">BMI (kg/m²)</th></tr></thead><tbody>
        <tr><td style="padding:8px">Underweight</td><td style="padding:8px">Below 18.5</td></tr><tr><td style="padding:8px">Healthy weight</td><td style="padding:8px">18.5 to &lt;25</td></tr><tr><td style="padding:8px">Overweight</td><td style="padding:8px">25 to &lt;30</td></tr><tr><td style="padding:8px">Obesity, class 1</td><td style="padding:8px">30 to &lt;35</td></tr><tr><td style="padding:8px">Obesity, class 2</td><td style="padding:8px">35 to &lt;40</td></tr><tr><td style="padding:8px">Obesity, class 3</td><td style="padding:8px">40 or greater</td></tr>
      </tbody></table>
      <h2>How to calculate BMI</h2>
      <p>Metric formula: <code>weight in kilograms ÷ height in metres²</code>. US customary formula: <code>weight in pounds ÷ height in inches² × 703</code>. For example, 70 kg at 1.75 m gives 70 ÷ (1.75 × 1.75) = 22.9.</p>
      <p>The calculation does not contain sex, age, frame size, or activity level. Separate adult “male BMI” and “female BMI” category tables would therefore be misleading. Children and teenagers use age- and sex-specific growth charts; this article and the linked calculator are for adults.</p>
      <h2>What differs between people with the same BMI?</h2>
      <p>BMI does not separate fat mass from muscle, show where fat is distributed, or measure blood pressure, glucose, cholesterol, fitness, pregnancy status, or medical history. A muscular person and a person with less muscle can have the same BMI and different body composition. Health risk can also vary with age, ethnicity, fat distribution, and other clinical factors.</p>
      <p>Use BMI as an initial screening number, not a verdict about health. A clinician may consider waist measurements, physical examination, laboratory results, health behaviours, and—when appropriate—body-composition assessment. Do not change medication, nutrition, or treatment based only on an online result.</p>
      <h2>Use the calculator carefully</h2>
      <ol><li>Measure height without shoes and weight on a suitable scale.</li><li>Choose the correct units in the <a href="/tools/bmi-calculator">BMI calculator</a>.</li><li>Read the result as a screening category.</li><li>If the result concerns you, is changing unexpectedly, or does not fit your circumstances, discuss it with a qualified healthcare professional.</li></ol>
      <h2>Authoritative references</h2>
      <ul><li><a href="https://www.cdc.gov/bmi/adult-calculator/bmi-categories.html" rel="noopener noreferrer">CDC: Adult BMI Categories</a></li><li><a href="https://www.cdc.gov/bmi/faq/" rel="noopener noreferrer">CDC: BMI Frequently Asked Questions</a></li><li><a href="https://www.nhlbi.nih.gov/health/heart-healthy-living/healthy-weight" rel="noopener noreferrer">National Heart, Lung, and Blood Institute: Aim for a Healthy Weight</a></li></ul>
      <p><strong>Medical limitation:</strong> This educational page and calculator do not provide a diagnosis or individual medical advice. The content has been aligned with the cited public-health guidance but has not been reviewed or approved by a clinician.</p>
    `,
  },
  'bmi-chart-by-height': {
    title: 'BMI Weight Ranges by Height for Adults',
    description: 'See how adult BMI thresholds translate into approximate weights at common heights, with formulas, rounding notes, and screening limitations.',
    content: `
      <h2>What a height-based BMI chart shows</h2>
      <p>A BMI-by-height chart converts the standard adult BMI thresholds into weights. It is a convenience table, not a separate health standard. The underlying adult categories are the same for men and women. Values are approximate because displayed weights are rounded.</p>
      <table style="width:100%;border-collapse:collapse"><thead><tr><th style="text-align:left;padding:8px">Height</th><th style="text-align:left;padding:8px">BMI 18.5 weight</th><th style="text-align:left;padding:8px">BMI 25 weight</th><th style="text-align:left;padding:8px">BMI 30 weight</th></tr></thead><tbody>
        <tr><td style="padding:8px">5′0″ (1.52 m)</td><td style="padding:8px">43 kg / 95 lb</td><td style="padding:8px">58 kg / 128 lb</td><td style="padding:8px">69 kg / 152 lb</td></tr><tr><td style="padding:8px">5′4″ (1.63 m)</td><td style="padding:8px">49 kg / 108 lb</td><td style="padding:8px">66 kg / 146 lb</td><td style="padding:8px">80 kg / 176 lb</td></tr><tr><td style="padding:8px">5′8″ (1.73 m)</td><td style="padding:8px">55 kg / 121 lb</td><td style="padding:8px">75 kg / 165 lb</td><td style="padding:8px">90 kg / 198 lb</td></tr><tr><td style="padding:8px">6′0″ (1.83 m)</td><td style="padding:8px">62 kg / 137 lb</td><td style="padding:8px">84 kg / 185 lb</td><td style="padding:8px">100 kg / 220 lb</td></tr><tr><td style="padding:8px">6′4″ (1.93 m)</td><td style="padding:8px">69 kg / 152 lb</td><td style="padding:8px">93 kg / 205 lb</td><td style="padding:8px">112 kg / 247 lb</td></tr>
      </tbody></table>
      <p>The “BMI 25 weight” is the point at which BMI reaches 25, not a personalised target. The table does not establish an “ideal” weight. To reproduce a cell, multiply the BMI threshold by height in metres squared. Pound values are conversions rounded to the nearest pound.</p>
      <h2>Example calculation</h2><p>At 1.73 m, the BMI 25 threshold is approximately <code>25 × 1.73² = 74.8 kg</code>. Small differences from another chart usually come from rounding the height or weight, not from different categories.</p>
      <h2>When the table is not appropriate</h2>
      <p>This adult table is not for people under 20, because children and teenagers require BMI-for-age assessment. BMI also does not directly measure body composition or fat distribution and can misclassify some individuals. Pregnancy, significant muscularity, changes in health, and population-specific clinical guidance can all require a different interpretation.</p>
      <p>For an exact unit-aware calculation, use the <a href="/tools/bmi-calculator">BMI calculator</a>. Treat its output as screening information and discuss individual concerns with a qualified healthcare professional.</p>
      <h2>Sources and review status</h2><ul><li><a href="https://www.cdc.gov/bmi/adult-calculator/bmi-categories.html" rel="noopener noreferrer">CDC: Adult BMI Categories</a></li><li><a href="https://www.cdc.gov/bmi/faq/" rel="noopener noreferrer">CDC: BMI formulas and interpretation</a></li></ul>
      <p><strong>Medical limitation:</strong> This page explains arithmetic and public-health screening categories. It is not medical advice and has not been clinically reviewed.</p>
    `,
  },
  'bmi-health-metrics-developers': {
    title: 'Implementing an Adult BMI Calculator: Formula, Boundaries, and Tests',
    description: 'A developer guide to adult BMI formulas, category boundaries, rounding, validation, accessibility, and responsible result wording.',
    content: `
      <h2>Scope the calculator correctly</h2><p>An adult BMI calculator performs simple arithmetic, but responsible implementation requires explicit scope. It should identify itself as an adult screening tool, avoid diagnostic language, preserve the unrounded value for classification, and explain that BMI does not directly measure body fat or individual health.</p>
      <h2>Formulas</h2><pre><code>// metric
bmi = weightKg / (heightM * heightM)

// US customary
bmi = (weightLb / (heightIn * heightIn)) * 703</code></pre>
      <p>Use the full-precision result when assigning a category, then round only for display. Otherwise, 24.96 could display as 25.0 and be placed in the wrong branch if classification uses the rounded number.</p>
      <h2>Adult category boundaries</h2><pre><code>if (bmi &lt; 18.5) return 'Underweight'
if (bmi &lt; 25) return 'Healthy weight'
if (bmi &lt; 30) return 'Overweight'
if (bmi &lt; 35) return 'Obesity, class 1'
if (bmi &lt; 40) return 'Obesity, class 2'
return 'Obesity, class 3'</code></pre>
      <p>For adults 20 and older, CDC describes these categories as applying regardless of age, sex, or race. Do not invent separate male and female category thresholds. A child or teen flow needs age- and sex-specific growth-chart data and should be a separate, clinically sourced implementation.</p>
      <h2>Validation and test cases</h2><ul><li>Reject zero, negative, non-finite, missing, or implausible values with a field-specific message.</li><li>Test exact boundaries: 18.5, 25, 30, 35, and 40, plus values immediately below each boundary.</li><li>Test equivalent metric and US-customary inputs within a documented rounding tolerance.</li><li>Keep labels associated with inputs and announce updated results to assistive technology.</li><li>Do not persist or transmit measurements unless the interface discloses and requires that behaviour.</li></ul>
      <h2>Responsible result copy</h2><p>Prefer “This result falls in the CDC adult screening category…” over “You are…” or “Your ideal weight is…”. Include a short limitation beside the result, not only in a distant disclaimer. Link users to the methodology and to appropriate professional care for individual questions.</p><p>Inspect the current browser-side implementation in the <a href="/tools/bmi-calculator">BMI calculator</a> and compare its output with these edge cases.</p>
      <h2>References</h2><ul><li><a href="https://www.cdc.gov/bmi/adult-calculator/bmi-categories.html" rel="noopener noreferrer">CDC: Adult BMI Categories</a></li><li><a href="https://www.cdc.gov/bmi/faq/" rel="noopener noreferrer">CDC: BMI FAQ and formulas</a></li></ul><p><strong>Review note:</strong> This engineering guide is based on the cited public-health definitions. It is not a clinical protocol and has not been reviewed by a medical professional.</p>
    `,
  },
}
