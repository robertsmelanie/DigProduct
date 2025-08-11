< !DOCTYPE html >
    <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <title>Digital Product Planner & Profit Calculator</title>
           
        </head>
        <body>
            <div class="wrap">
                <header>
                    <div class="logo">📦</div>
                    <div>
                        <h1>Digital Product Planner & Profit Calculator</h1>
                        <div class="sub">Rapidly plan language templates, lesson planners, niche guides, and e-books — then export your plan.</div>
                    </div>
                </header>

                <div class="grid" id="app">
                    <section class="card">
                        <div class="h"><h2>1) Inputs</h2><div class="small">Autosaves locally</div></div>
                        <div class="b">
                            <div class="row">
                                <div>
                                    <label>Product Type</label>
                                    <select id="type">
                                        <option>Language Learning Template</option>
                                        <option>Lesson Planner</option>
                                        <option>Niche Guide</option>
                                        <option>E-book</option>
                                    </select>
                                </div>
                                <div>
                                    <label>Main Topic</label>
                                    <input id="topic" placeholder="e.g., Spanish verb tenses / Montessori math / Vanlife SEO / Gut health basics" />
                                </div>
                            </div>
                            <div class="row">
                                <div>
                                    <label>Target Audience</label>
                                    <input id="audience" placeholder="e.g., busy parents, freelance designers, homeschool teachers" />
                                </div>
                                <div>
                                    <label>Skill Level</label>
                                    <select id="level"><option>Beginner</option><option>Intermediate</option><option>Advanced</option></select>
                                </div>
                            </div>
                            <div class="row">
                                <div>
                                    <label>Primary Outcome / Promise</label>
                                    <input id="promise" placeholder="e.g., master past tense in 7 days; plan a semester in 2 hours" />
                                </div>
                                <div>
                                    <label>Brand Voice</label>
                                    <select id="tone"><option>Friendly</option><option>Professional</option><option>No‑nonsense</option><option>Playful</option></select>
                                </div>
                            </div>
                            <div class="row">
                                <div>
                                    <label>Base Price (USD)</label>
                                    <input id="price" type="number" min="0" step="1" value="29" />
                                </div>
                                <div>
                                    <label>Monthly Revenue Goal (USD)</label>
                                    <input id="goal" type="number" min="0" step="50" value="1000" />
                                </div>
                            </div>
                            <div style="margin-top:8px;display:flex;flex-wrap:wrap;gap:12px">
                                <label class="chk"><input id="includeBundle" type="checkbox"> Include a bundle / pro tier</label>
                                <label class="chk"><input id="commercialLicense" type="checkbox" checked> Offer personal & commercial licenses</label>
                            </div>
                            <div class="actions">
                                <button id="generate">Generate Plan</button>
                                <button class="sec" id="reset">Reset</button>
                            </div>
                        </div>
                    </section>

                    <section class="card">
                        <div class="h"><h2>2) KPIs & Pricing</h2><div class="small">Live calculations</div></div>
                        <div class="b">
                            <div class="kpi" id="kpi"></div>
                            <div class="hr" style="margin:14px 0"></div>
                            <div id="pricing"></div>
                        </div>
                    </section>

                    <section class="card" style="grid-column:1/-1">
                        <div class="h"><h2>3) Titles, Outlines, Copy, and Tasks</h2>
                            <div class="actions">
                                <button class="sec" id="copyAll">Copy All</button>
                                <button class="sec" id="downloadMd">Download .md</button>
                                <button class="sec" id="downloadJson">Download .json</button>
                            </div>
                        </div>
                        <div class="b">
                            <h3>Title Ideas</h3>
                            <div id="titles" class="out"></div>

                            <h3 style="margin-top:18px">Product Outline</h3>
                            <div id="outline" class="out"></div>

                            <h3 style="margin-top:18px">Value Props & Differentiators</h3>
                            <div id="valueProps" class="out"></div>

                            <h3 style="margin-top:18px">SEO & Content Angles</h3>
                            <div id="seo" class="out"></div>

                            <h3 style="margin-top:18px">Landing Page Copy</h3>
                            <div id="landing" class="out"></div>

                            <h3 style="margin-top:18px">Social Hooks</h3>
                            <div id="social" class="out"></div>

                            <h3 style="margin-top:18px">Build Checklist (7‑Day Sprint)</h3>
                            <div id="checklist" class="out"></div>

                            <div class="small" style="margin-top:10px">Tip: pair with affiliate links to relevant software (course platforms, design tools, hosting). Add AdSense to the landing page later.</div>
                        </div>
                    </section>

                </div>

                <div class="footer">Made with ❤️ — runs entirely in your browser. No backend.</div>
            </div>

            <script>
    const $=sel=>document.querySelector(sel);
                const stateKey='digital-product-planner-v1';

                const inputs={
                    type: $('#type'), topic: $('#topic'), audience: $('#audience'), level: $('#level'), promise: $('#promise'), tone: $('#tone'), price: $('#price'), goal: $('#goal'), includeBundle: $('#includeBundle'), commercialLicense: $('#commercialLicense')
    };

                // Restore from localStorage
                (function restore(){
      try{
        const s=JSON.parse(localStorage.getItem(stateKey)||'null');
                if(!s) return;
        Object.keys(inputs).forEach(k=>{
          if(typeof inputs[k].checked!=="undefined") inputs[k].checked=!!s[k];
                else inputs[k].value=s[k]||inputs[k].value;
        });
      }catch(e){ }
    })();

    // Autosave
    const save=()=>{
      const s={ };
      Object.keys(inputs).forEach(k=>{
                    s[k] = typeof inputs[k].checked !== "undefined" ? inputs[k].checked : inputs[k].value;
      });
                localStorage.setItem(stateKey,JSON.stringify(s));
    };
    Object.values(inputs).forEach(el=>el.addEventListener('input',save));

    const nicify=n=>n.toLocaleString(undefined,{maximumFractionDigits:0});

                const titleTemplates={
                    'Language Learning Template':[
                'Master {topic}: A {level} Template for {audience}',
                '{topic} in 15 Minutes/Day – Plug‑and‑Play Sheets',
                '{topic} Sprint: {promise}',
                '{topic} Toolkit: Flashcards, Drills, and Trackers',
                'From Zero to {topic}: Guided Template Pack'
                ],
                'Lesson Planner':[
                '{level} Lesson Planner for {topic} ({audience})',
                'Plan {topic} in 2 Hours: Smart Planner',
                '{topic} Curriculum Map + Weekly Templates',
                'Scope & Sequence: {topic} Planner Kit',
                '{topic} Stations & Centers – Printable Planner'
                ],
                'Niche Guide':[
                '{topic} for {audience}: No‑Fluff Guide',
                'The Practical {topic} Playbook ({level})',
                '{topic} in 7 Days: Field‑Tested Steps',
                'Zero‑to‑One: {topic} Starter Pack',
                '{topic} Cheatsheets, Checklists & Templates'
                ],
                'E-book':[
                '{topic}: The {level} Handbook for {audience}',
                'Tiny Book of {topic} – Do More in Less Time',
                'First Principles: {topic}',
                '{topic} Without the Fluff',
                'From Idea to Action: {topic}'
                ]
    };

                const outlineBlocks={
                    'Language Learning Template':[
                'Overview: How to use this template to achieve {promise}.',
                'Daily Routine: 20‑minute plan with spaced repetition.',
                'Core Concepts: {topic} explained simply for {level}.',
                'Exercises: Fill‑in‑the‑blank, translation, and speaking prompts.',
                'Tracking: Progress tracker + habit chain.',
                'Bonus: Printable flashcards + review calendar.'
                ],
                'Lesson Planner':[
                'Planner Setup: Calendars, standards alignment, outcomes.',
                'Unit Builder: Backward design for {topic}.',
                'Weekly Plan: Objectives, activities, assessments.',
                'Differentiation: Supports for {audience} at {level}.',
                'Resources: Materials list, links, and rubrics.',
                'Reflect & Iterate: Post‑lesson notes and improvements.'
                ],
                'Niche Guide':[
                'Foundations: Plain‑English intro to {topic}.',
                'Quick Wins: 3 actions to see results this week.',
                'Systems: Repeatable process tailored to {audience}.',
                'Templates: Copy‑paste scripts, checklists.',
                'Avoid These: Common pitfalls and fixes.',
                'Roadmap: 30/60/90‑day plan to reach {promise}.'
                ],
                'E-book':[
                'Chapter 1: Why {topic} matters now.',
                'Chapter 2: Core principles for {level} readers.',
                'Chapter 3: Step‑by‑step framework to reach {promise}.',
                'Chapter 4: Case studies for {audience}.',
                'Chapter 5: Advanced tips & mistakes to avoid.',
                'Appendix: Resources, worksheets, references.'
                ]
    };

                const valuePropsByType={
                    'Language Learning Template':[
                'Built‑in spaced repetition and habit tracking.',
                'Printable flashcards + digital trackers.',
                'Micro‑lessons for busy {audience}.',
                'Beginner‑friendly explanations with examples of {topic}.',
                ],
                'Lesson Planner':[
                'Backward‑design workflow with standards mapping.',
                'Plug‑and‑play weekly templates that save 3+ hrs/week.',
                'Assessment rubrics and differentiation ideas for {audience}.',
                'Export to PDF and print‑ready layouts.'
                ],
                'Niche Guide':[
                'No fluff: only field‑tested steps and checklists.',
                'Copy‑paste templates and scripts you can use today.',
                'Focus on quick wins before deep dives.',
                'Designed for {audience} at a {level} level.'
                ],
                'E-book':[
                'Short, tactical chapters with summaries.',
                'Real examples relevant to {audience}.',
                'Companion worksheets and templates.',
                'Update guarantee: free minor revisions.'
                ]
    };

                function fill(template, ctx){
      return template.replace(/\{(\w+)\}/g,(_,k)=>ctx[k]||'');
    }

                function generateTitles(ctx){
      const t=titleTemplates[ctx.type];
      return t.map(x=>"• "+fill(x,ctx)).join("\n");
    }

                function generateOutline(ctx){
      return outlineBlocks[ctx.type].map((x,i)=>`${i + 1}. ${fill(x, ctx)}`).join("\n");
    }

                function genValueProps(ctx){
      return valuePropsByType[ctx.type].map(x=>"• "+fill(x,ctx)).join("\n");
    }

                function keywordify(topic,audience){
      const base=topic.toLowerCase().replace(/[^a-z0-9 ]/g,'').trim();
                const aud=audience.toLowerCase().split(',')[0]?.trim()||'';
                const tails=['for beginners','step by step','template','checklist','planner','how to','fast','in 7 days','examples','pdf'];
                const out=new Set();
      tails.forEach(t=>out.add(`${base} ${t}`));
      if(aud) ['for','guide for','template for'].forEach(p=>out.add(`${base} ${p} ${aud}`));
      return Array.from(out).slice(0,12).map(k=>`• ${k}`).join('\n');
    }

                function landingCopy(ctx){
      const h1=fill('{topic} — {promise}',ctx);
                const sub=fill('A {type} built for {audience} at a {level} level. {tone} and actionable.',ctx);
                const bullets=genValueProps(ctx);
                const faq=[
                ['Who is this for?','Designed for '+ctx.audience+' at a '+ctx.level+' level.'],
                ['How long does it take?','Most users see progress in 7 days when following the plan.'],
                ['What formats?','Comes in PDF + editable docs/spreadsheets.']
      ].map(([q,a])=>`Q: ${q}\nA: ${a}`).join('\n\n');
                return `Headline\n${h1}\n\nSubhead\n${sub}\n\nFeatures\n${bullets}\n\nCTA\nGet instant access →\n\nFAQ\n${faq}`;
    }

                function socialHooks(ctx){
      const hooks=[
                `I built a ${ctx.type.toLowerCase()} so ${ctx.audience} can ${ctx.promise.toLowerCase()}. Want it?`,
                `${ctx.topic}: 3 mistakes ${ctx.audience} keep making (and the fixes)`,
                `Give me 7 days. I’ll help you ${ctx.promise.toLowerCase()} — here’s the plan:`,
                `Steal my ${ctx.type.toLowerCase()} outline for ${ctx.topic}.`,
                `From 0 to ${ctx.topic}: the exact checklists I wish I had.`
                ];
      return hooks.map(h=>'• '+h).join('\n');
    }

                function checklist(ctx){
      const days=[
                'Day 1 — Define scope, outcomes, and success metrics.',
                'Day 2 — Draft outline and create core templates.',
                'Day 3 — Produce examples & walkthroughs tailored to '+ctx.audience+'.',
                'Day 4 — Design: polish layouts, add typography and icons.',
                'Day 5 — QA: run through with 1–2 test users; refine.',
                'Day 6 — Landing page copy + visuals; set up checkout.',
                'Day 7 — Publish, post 3 social hooks, email 5 creators for feedback.'
                ];
      return days.map(d=>`□ ${d}`).join('\n');
    }

                function pricingCalc(price,goal,includeBundle){
      const p=Number(price)||0; const g=Number(goal)||0;
                const low=Math.max(7, Math.round(p*0.6));
                const base=p||29; const pro=Math.round(base*1.8);
                const units=Math.ceil(g/Math.max(1,base));
                const perDay=Math.ceil(units/30);
                const conv=0.02; // 2% site conversion assumption
                const visitors=Math.ceil(units/conv);
                const bundleText= includeBundle? `\n• Pro/Bundle: $${pro} (base + extras, e.g., extra templates, commercial license, video walkthrough)` : '';
                return {
                    kpis:[
                {label:'Base Price', value:`$${base}`},
                {label:'Units / month', value:nicify(units)},
                {label:'Units / day', value:nicify(perDay)}
                ],
                blurb:`Suggested Pricing\n• Starter: $${low} (entry point)\n• Standard: $${base} (most popular)${bundleText}\n\nTraffic math\n• With ~2% conversion, you need ~${nicify(visitors)} visitors/month to hit $${nicify(g)}.\n• At 10% affiliate cut to partners, profit per base sale ≈ $${Math.round(base * 0.9)}.`,
                tiers:{low, base, pro, visitors}
      };
    }

                function ctxFromInputs(){
      const ctx={ };
      Object.keys(inputs).forEach(k=>{
                    ctx[k] = typeof inputs[k].checked !== "undefined" ? inputs[k].checked : (inputs[k].value || '').trim();
      });
                return ctx;
    }

                function render(){
      const ctx=ctxFromInputs();
                const titles=generateTitles(ctx);
                const outline=generateOutline(ctx);
                const values=genValueProps(ctx);
                const seo=keywordify(ctx.topic,ctx.audience);
                const land=landingCopy(ctx);
                const social=socialHooks(ctx);
                const check=checklist(ctx);
                const pricing=pricingCalc(ctx.price,ctx.goal,ctx.includeBundle);

      // KPIs
      $('#kpi').innerHTML=pricing.kpis.map(k=>`<div class="tile"><b>${k.label}</b><span>${k.value}</span></div>`).join('');
                $('#pricing').innerHTML=`<div class="out">${pricing.blurb}</div>`;

                // Text blocks
                $('#titles').textContent=titles;
                $('#outline').textContent=outline;
                $('#valueProps').textContent=values;
                $('#seo').textContent=seo;
                $('#landing').textContent=land;
                $('#social').textContent=social;
                $('#checklist').textContent=check;

                // Save snapshot for export
                window.__snapshot={ctx, titles, outline, values, seo, land, social, check, pricing};
    }

                function toMarkdown(snap){
      const {ctx}=snap;
                return `# ${ctx.type} Plan — ${ctx.topic}\n\n**Audience:** ${ctx.audience}  \\n**Level:** ${ctx.level}  \\n**Promise:** ${ctx.promise}  \\n**Tone:** ${ctx.tone}  \\n**Price:** $${ctx.price}  \\n**Monthly Goal:** $${ctx.goal}\n\n---\n\n## Title Ideas\n${snap.titles}\n\n## Product Outline\n${snap.outline}\n\n## Value Props\n${snap.values}\n\n## SEO Keywords\n${snap.seo}\n\n## Landing Page Copy\n${snap.land}\n\n## Social Hooks\n${snap.social}\n\n## Build Checklist\n${snap.check}\n\n## Pricing & KPIs\n${snap.pricing.blurb}\n`;
    }

                function download(filename, text){
      const a=document.createElement('a');
                a.href=URL.createObjectURL(new Blob([text],{type:'text/plain'}));
                a.download=filename; a.click(); URL.revokeObjectURL(a.href);
    }

    // Bindings
    $('#generate').addEventListener('click',()=>{render();save();flash('#generate')});
    $('#reset').addEventListener('click',()=>{localStorage.removeItem(stateKey); location.reload()});
    $('#copyAll').addEventListener('click',async()=>{
      const md=toMarkdown(window.__snapshot||{ctx:ctxFromInputs()});
                try{await navigator.clipboard.writeText(md); toast('Copied full plan to clipboard','success');}catch(e){toast('Copy failed — try Download .md', 'warn')}
    });
    $('#downloadMd').addEventListener('click',()=>{
      const md=toMarkdown(window.__snapshot||{ctx:ctxFromInputs()});
                download(`plan-${Date.now()}.md`,md);
    });
    $('#downloadJson').addEventListener('click',()=>{
      const data=JSON.stringify(window.__snapshot||{ctx:ctxFromInputs()},null,2);
                download(`plan-${Date.now()}.json`,data);
    });

                function flash(sel){
      const el=$(sel); el.animate([{transform:'scale(1)'},{transform:'scale(1.05)'},{transform:'scale(1)'}],{duration:300});
    }

                function toast(msg,type='info'){
      const t=document.createElement('div');
                t.textContent=msg; t.className='pill';
                if(type==='success') t.classList.add('success');
                t.style.position='fixed'; t.style.bottom='20px'; t.style.right='20px';
                t.style.zIndex='9999'; document.body.appendChild(t);
      setTimeout(()=>t.remove(),2200);
    }

                // Initial render
                render();
            </script>
        </body>
    </html>
