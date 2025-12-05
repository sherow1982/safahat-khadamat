@echo off
echo إنشاء موقع خدمات الخليج...
python create_khaleej_services.py
if %errorlevel% equ 0 (
    echo ✓ تم إنشاء الموقع بنجاح
    echo 📞 للتواصل: 00201110760081
) else (
    echo ❌ حدث خطأ
)
pause