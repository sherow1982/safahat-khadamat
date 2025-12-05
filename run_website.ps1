Write-Host "إنشاء موقع خدمات الخليج..." -ForegroundColor Cyan
python create_khaleej_services.py
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ تم إنشاء الموقع بنجاح" -ForegroundColor Green
    Write-Host "📞 للتواصل: 00201110760081" -ForegroundColor Yellow
} else {
    Write-Host "❌ حدث خطأ" -ForegroundColor Red
}
pause