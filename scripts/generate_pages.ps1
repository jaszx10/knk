$html = Get-Content -Raw "ronin.html"

$pages = @(
    @{
        file = "rtr180.html"
        title = "TVS Apache RTR 180 - KNK TVS"
        slogan = "Racing DNA Unleashed"
        h1 = "TVS APACHE RTR 180"
        desc = "Experience the thrill of the race track every day. Designed for the racers, the Apache RTR 180 is your perfect partner for performance and unscripted speeds."
        model = "TVS Apache RTR 180"
        js = "rtr180-details.js"
    },
    @{
        file = "rtr1604v.html"
        title = "TVS Apache RTR 160 4V - KNK TVS"
        slogan = "Unstoppable Performance"
        h1 = "TVS APACHE RTR 160 4V"
        desc = "Engineered to outperform, the Apache RTR 160 4V ensures unmatched power, stability, and control across every terrain."
        model = "TVS Apache RTR 160 4V"
        js = "rtr1604v-details.js"
    },
    @{
        file = "rtr160.html"
        title = "TVS Apache RTR 160 - KNK TVS"
        slogan = "The Racing Legend"
        h1 = "TVS APACHE RTR 160"
        desc = "Unleash the legend with the TVS Apache RTR 160. Driven by racing DNA, it brings adrenaline-pumping momentum into the everyday grind."
        model = "TVS Apache RTR 160"
        js = "rtr160-details.js"
    }
)

foreach ($p in $pages) {
    $newHtml = $html.Replace('<title>TVS Ronin - KNK TVS</title>', "<title>$($p.title)</title>")
    $newHtml = $newHtml.Replace('<span class="text-[#bb0013] font-bold text-sm tracking-widest uppercase">The Unscripted Life</span>', "<span class=`"text-[#bb0013] font-bold text-sm tracking-widest uppercase`">$($p.slogan)</span>")
    $newHtml = $newHtml.Replace('<h1 class="text-4xl lg:text-6xl font-black text-[#0a1e7b] font-headline mb-4 italic leading-tight">TVS RONIN</h1>', "<h1 class=`"text-4xl lg:text-6xl font-black text-[#0a1e7b] font-headline mb-4 italic leading-tight`">$($p.h1)</h1>")
    $newHtml = $newHtml.Replace('<p class="text-slate-500 text-lg mb-8 leading-relaxed">Introducing the TVS Ronin—a bike that defies categories. Designed for the multi-faceted, the Ronin is your perfect partner for both urban commutes and unscripted weekends.</p>', "<p class=`"text-slate-500 text-lg mb-8 leading-relaxed`">$($p.desc)</p>")
    $newHtml = $newHtml.Replace("onclick=`"openBookingModal('Ronin')`"", "onclick=`"openBookingModal('$($p.model)')`"")
    $newHtml = $newHtml.Replace('<input type="hidden" name="model" value="TVS Ronin">', "<input type=`"hidden`" name=`"model`" value=`"$($p.model)`">")
    $newHtml = $newHtml.Replace('<input type="text" value="TVS Ronin" readonly class="w-full px-4 py-3 bg-slate-100 border-none rounded-xl font-body text-primary font-bold cursor-not-allowed opacity-80">', "<input type=`"text`" value=`"$($p.model)`" readonly class=`"w-full px-4 py-3 bg-slate-100 border-none rounded-xl font-body text-primary font-bold cursor-not-allowed opacity-80`">")
    $newHtml = $newHtml.Replace('Experience the Ronin today.', "Experience the $($p.model) today.")
    $newHtml = $newHtml.Replace('<script src="assets/js/product-details.js"></script>', "<script src=`"assets/js/$($p.js)`"></script>")
    
    Set-Content -Path $p.file -Value $newHtml -Encoding UTF8
    Write-Host "Created $($p.file)"
}
