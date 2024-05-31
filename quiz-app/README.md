# Quiz Application

- Uygulamaya linkten ulaşabilirsiniz.
**https://quizapp-task2.netlify.app/**
## Working Logic
    - Uygulama 10 sorudan ve her soru 4 şıktan oluşmaktadır.
    - Önceki soruya dönülmeyecektir.
    - Sorular sadece 1 kere işaretlenebilir ve birden fazla cevap işaretlenemez. 
    - Her soru için 30 saniye vardır ve ilk 10 saniye soru yanıtlanmayacaktır.
    - Eğer süre bittiyse doğru cevap işaretlenir ve 2 sn içerisinde otomatik olarak diğer soru gösterilir.
    - Testin sonunda sorulara verilen cevaplar ve kullanıcı skoru tablo şeklinde kullancııya sunulur.

## Bugs
    -  Soru yüklendiği zaman, süre kuralının düzgün çalışabilmesi için timer'ın sıfırlanması beklenmelidir. Timer ile sorular tam olarak senkron çalışmamaktadır.
