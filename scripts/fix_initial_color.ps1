$files = Get-ChildItem -Path "assets\js" -Filter "*-details.js"
foreach ($f in $files) {
    $content = [IO.File]::ReadAllText($f.FullName)
    # Target the exact sequence of method calls in initProductPage
    $newContent = $content -replace 'renderSpecs\(\);\s*updateGallery\(\);', "renderSpecs();`r`n    selectColor(0);"
    [IO.File]::WriteAllText($f.FullName, $newContent, [System.Text.Encoding]::UTF8)
    Write-Host "Updated $($f.Name)"
}
