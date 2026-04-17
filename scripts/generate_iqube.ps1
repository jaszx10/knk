$html = Get-Content -Raw "ronin.html"

$pages = @(
    @{
        file = "iqube.html"
        title = "TVS iQube - KNK TVS"
        slogan = "Smartly Simple"
        h1 = "TVS iQUBE"
        desc = "The TVS iQube 2.2 kWh electric scooter offers you a smartly simple ride with modern intelligent features, effortless performance, and eco-friendly efficiency for your everyday commute."
        model = "TVS iQube"
        js = "iqube-details.js"
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
