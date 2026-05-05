# Chiziqsiz regressiya uchun korrelyatsiya qanday hisoblanadi?

---

## 1. Umumiy tushuncha

Chiziqli regressiyada o'zgaruvchilar orasidagi bog'lanish kuchi **Pearson korrelyatsiya koeffitsienti (r)** orqali o'lchanadi. Lekin chiziqsiz (nochiziqli) regressiyada bu ko'rsatkich **to'g'ri kelmaydi**, chunki bog'lanish egri chiziq bo'ylab ifodalanadi.

Shu sababli chiziqsiz regressiyada bog'lanish kuchini baholash uchun **korrelyatsiya indeksi (R)** va **determinatsiya koeffitsienti (R²)** ishlatiladi.

---

## 2. Korrelyatsiya indeksi (R)

Korrelyatsiya indeksi quyidagi formula orqali hisoblanadi:

$$R = \sqrt{1 - \frac{Q_{\text{ost}}}{Q_y}}$$

Bu yerda:

| Belgi | Nomi | Formula |
|-------|------|---------|
| $Q_{\text{ost}}$ | Qoldiq kvadratlar yig'indisi | $Q_{\text{ost}} = \sum_{i=1}^{n}(y_i - \hat{y}_i)^2$ |
| $Q_y$ | Umumiy kvadratlar yig'indisi | $Q_y = \sum_{i=1}^{n}(y_i - \bar{y})^2$ |
| $y_i$ | Haqiqiy (kuzatilgan) qiymatlar | — |
| $\hat{y}_i$ | Model bo'yicha hisoblangan qiymatlar | — |
| $\bar{y}$ | $y$ ning o'rtacha qiymati | $\bar{y} = \dfrac{1}{n}\sum y_i$ |

> **Xususiyat:** $0 \leq R \leq 1$

---

## 3. Determinatsiya koeffitsienti (R²)

Determinatsiya koeffitsienti modelning umumiy dispersiyani qancha qismini tushuntirishi:

$$R^2 = 1 - \frac{Q_{\text{ost}}}{Q_y} = \frac{Q_y - Q_{\text{ost}}}{Q_y}$$

Yoki boshqacha yozilsa:

$$R^2 = \frac{\sum(\hat{y}_i - \bar{y})^2}{\sum(y_i - \bar{y})^2}$$

---

## 4. Natijani talqin qilish

| $R^2$ qiymati | Bog'lanish kuchi |
|---------------|-----------------|
| $0{,}9 \leq R^2 \leq 1{,}0$ | Juda kuchli (model juda yaxshi) |
| $0{,}7 \leq R^2 < 0{,}9$ | Kuchli |
| $0{,}5 \leq R^2 < 0{,}7$ | O'rtacha |
| $R^2 < 0{,}5$ | Zaif (model yomon) |

---

## 5. Hisoblash tartibi (bosqichma-bosqich)

### 1-bosqich: $\bar{y}$ ni hisoblang

$$\bar{y} = \frac{1}{n} \sum_{i=1}^{n} y_i$$

### 2-bosqich: $Q_y$ ni hisoblang

$$Q_y = \sum_{i=1}^{n}(y_i - \bar{y})^2$$

### 3-bosqich: Tanlangan chiziqsiz model bo'yicha $\hat{y}_i$ ni toping

Masalan, darajali funksiya uchun:

$$\hat{y} = a \cdot x^b$$

Yoki ko'rsatkichli (eksponensial) model uchun:

$$\hat{y} = a \cdot e^{bx}$$

### 4-bosqich: $Q_{\text{ost}}$ ni hisoblang

$$Q_{\text{ost}} = \sum_{i=1}^{n}(y_i - \hat{y}_i)^2$$

### 5-bosqich: $R$ va $R^2$ ni hisoblang

$$R^2 = 1 - \frac{Q_{\text{ost}}}{Q_y}, \qquad R = \sqrt{R^2}$$

---

## 6. Chiziqli va chiziqsiz korrelyatsiya farqi

| Xususiyat | Chiziqli regressiya | Chiziqsiz regressiya |
|-----------|--------------------|-----------------------|
| Ko'rsatkich | Pearson $r$ | Korrelyatsiya indeksi $R$ |
| Qiymat oralig'i | $-1 \leq r \leq 1$ | $0 \leq R \leq 1$ |
| Ishorasi | Musbat / manfiy | Faqat musbat |
| Qo'llanilishi | Faqat to'g'ri chiziq | Har qanday egri model |

> ⚠️ **Muhim:** Chiziqsiz regressiyada $R$ ko'rsatkichi **manfiy bo'lmaydi**, chunki u determinatsiya koeffitsientining ildizi sifatida hisoblanadi. Bog'lanish yo'nalishi (musbat/manfiy) esa model ko'rinishidan aniqlanadi.

---

## 7. Xulosa

Chiziqsiz regressiyada korrelyatsiya quyidagicha hisoblanadi:

$$R = \sqrt{1 - \frac{\sum(y_i - \hat{y}_i)^2}{\sum(y_i - \bar{y})^2}}$$

$R$ qiymati **1 ga yaqin** bo'lsa — tanlangan chiziqsiz model kuzatilgan ma'lumotlarga **yaxshi mos keladi**.  
$R$ qiymati **0 ga yaqin** bo'lsa — model ma'lumotlarni tushuntira olmaydi va boshqa model tanlash kerak.
