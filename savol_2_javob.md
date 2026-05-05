# 2-Masala: Darajali Funksiya Regressiyasi — To'liq Yechim

## Berilgan ma'lumotlar

| №  | x (ming dona) | y (ming so'm) |
|----|--------------|--------------|
| 1  | 2,5          | 2,1          |
| 2  | 3,0          | 2,2          |
| 3  | 4,5          | 2,4          |
| 4  | 5,2          | 2,8          |
| 5  | 5,0          | 3,1          |
| 6  | 5,3          | 2,0          |
| 7  | 6,2          | 6,2          |
| 8  | 6,4          | 5,4          |
| 9  | 7,1          | 3,6          |
| 10 | 7,6          | 3,0          |

---

## 1-Topshiriq: Darajali Funksiya Parametrlarini Hisoblash

### 1.1. Model tanlash

Darajali funksiya modeli:

$$\hat{y} = a \cdot x^b$$

Bu funksiyani **chiziqli ko'rinishga keltirish** uchun ikki tomondan natural logarifm olamiz:

$$\ln(\hat{y}) = \ln(a) + b \cdot \ln(x)$$

Almashtirish kiritamiz:

$$Y = A + b \cdot X$$

bu yerda: $Y = \ln(y)$, $X = \ln(x)$, $A = \ln(a)$

Endi bu oddiy **chiziqli regressiya** — eng kichik kvadratlar usuli (MNK) bilan yechamiz.

---

### 1.2. MNK formulalari

$$b = \frac{n \sum X_i Y_i - \sum X_i \cdot \sum Y_i}{n \sum X_i^2 - \left(\sum X_i\right)^2}$$

$$A = \frac{\sum Y_i - b \cdot \sum X_i}{n}, \quad a = e^A$$

---

### 1.3. Hisob-kitob jadvali

| №  | $x_i$ | $y_i$ | $X_i = \ln(x_i)$ | $Y_i = \ln(y_i)$ | $X_i^2$ | $X_i Y_i$ |
|----|--------|--------|-------------------|-------------------|---------|-----------|
| 1  | 2,5    | 2,1    | 0,9163            | 0,7419            | 0,8396  | 0,6798    |
| 2  | 3,0    | 2,2    | 1,0986            | 0,7885            | 1,2069  | 0,8663    |
| 3  | 4,5    | 2,4    | 1,5041            | 0,8755            | 2,2623  | 1,3167    |
| 4  | 5,2    | 2,8    | 1,6487            | 1,0296            | 2,7182  | 1,6975    |
| 5  | 5,0    | 3,1    | 1,6094            | 1,1314            | 2,5902  | 1,8204    |
| 6  | 5,3    | 2,0    | 1,6677            | 0,6931            | 2,7812  | 1,1557    |
| 7  | 6,2    | 6,2    | 1,8245            | 1,8245            | 3,3288  | 3,3288    |
| 8  | 6,4    | 5,4    | 1,8563            | 1,6864            | 3,4459  | 3,1295    |
| 9  | 7,1    | 3,6    | 1,9601            | 1,2809            | 3,8420  | 2,5107    |
| 10 | 7,6    | 3,0    | 2,0281            | 1,0986            | 4,1132  | 2,2281    |
| **Σ** | —   | —      | **16,1138**       | **11,1504**       | **27,1283** | **18,7335** |

---

### 1.4. b koeffitsientini hisoblash

$$b = \frac{n \sum X_i Y_i - \sum X_i \cdot \sum Y_i}{n \sum X_i^2 - (\sum X_i)^2}$$

$$b = \frac{10 \times 18{,}7335 - 16{,}1138 \times 11{,}1504}{10 \times 27{,}1283 - (16{,}1138)^2}$$

$$b = \frac{187{,}335 - 179{,}675}{271{,}283 - 259{,}655} = \frac{7{,}660}{11{,}628}$$

$$\boxed{b = 0{,}659}$$

---

### 1.5. A va a koeffitsientlarini hisoblash

$$A = \frac{\sum Y_i - b \cdot \sum X_i}{n} = \frac{11{,}1504 - 0{,}659 \times 16{,}1138}{10}$$

$$A = \frac{11{,}1504 - 10{,}619}{10} = \frac{0{,}531}{10} = 0{,}0531$$

$$a = e^A = e^{0{,}0531}$$

$$\boxed{a = 1{,}0545}$$

---

### 1.6. Darajali funksiya modeli

$$\hat{y} = 1{,}0545 \cdot x^{0{,}659}$$

---

## 2-Topshiriq: Modelni Baholash

### 2.1. Hisoblangan (ŷ) qiymatlar va xatolar

Har bir kuzatuv uchun: $\hat{y}_i = 1{,}0545 \cdot x_i^{0{,}659}$

| №  | xi  | yi  | ŷi    | yi − ŷi | (yi − ŷi)²  | \|yi − ŷi\| / yi × 100% |
|----|-----|-----|-------|---------|-------------|--------------------------|
| 1  | 2,5 | 2,1 | 1,931 | +0,169  | 0,02856     | 8,05%                    |
| 2  | 3,0 | 2,2 | 2,179 | +0,021  | 0,00044     | 0,95%                    |
| 3  | 4,5 | 2,4 | 2,846 | −0,446  | 0,19892     | 18,58%                   |
| 4  | 5,2 | 2,8 | 3,133 | −0,333  | 0,11089     | 11,89%                   |
| 5  | 5,0 | 3,1 | 3,045 | +0,055  | 0,00303     | 1,77%                    |
| 6  | 5,3 | 2,0 | 3,171 | −1,171  | 1,37124     | 58,55%                   |
| 7  | 6,2 | 6,2 | 3,515 | +2,685  | 7,20923     | 43,31%                   |
| 8  | 6,4 | 5,4 | 3,588 | +1,812  | 3,28334     | 33,56%                   |
| 9  | 7,1 | 3,6 | 3,846 | −0,246  | 0,06050     | 6,83%                    |
| 10 | 7,6 | 3,0 | 4,029 | −1,029  | 1,05885     | 34,30%                   |
| **Σ** | — | — | —   | —       | **13,3250** | **217,79%**              |

---

### 2.2. O'rtacha Approksimattsiya Xatoligi (Ā)

**Formula:**

$$\bar{A} = \frac{1}{n} \sum_{i=1}^{n} \frac{|y_i - \hat{y}_i|}{y_i} \times 100\%$$

**Hisoblash:**

$$\bar{A} = \frac{217{,}79\%}{10} = 21{,}78\%$$

$$\bar{A} = 21{,}78\%$$

**Talqin:**

| Ā qiymati | Baho |
|-----------|------|
| Ā < 5%    | Model juda aniq |
| 5% ≤ Ā < 10% | Model yaxshi |
| 10% ≤ Ā < 15% | Model qoniqarli |
| Ā ≥ 15%   | Model aniq emas |

> ⚠️ **Xulosa:** $\bar{A} = 21{,}78\% > 15\%$ — model approksimattsiya aniqligi **qoniqarsiz**. Bu asosan 6, 7, 8-kuzatuvlardagi katta og'ishlardan kelib chiqmoqda (anomal qiymatlar mavjud).

---

### 2.3. Korrelyatsiya Indeksi (R) va Determinatsiya Koeffitsienti (R²)

**ȳ — o'rtacha qiymat:**

$$\bar{y} = \frac{\sum y_i}{n} = \frac{2{,}1 + 2{,}2 + 2{,}4 + 2{,}8 + 3{,}1 + 2{,}0 + 6{,}2 + 5{,}4 + 3{,}6 + 3{,}0}{10} = \frac{32{,}8}{10} = 3{,}28$$

**Umumiy kvadratlar yig'indisi:**

$$Q_y = \sum_{i=1}^{n}(y_i - \bar{y})^2$$

| №  | $y_i$ | $y_i - \bar{y}$ | $(y_i - \bar{y})^2$ |
|----|--------|-----------------|---------------------|
| 1  | 2,1    | −1,18           | 1,3924              |
| 2  | 2,2    | −1,08           | 1,1664              |
| 3  | 2,4    | −0,88           | 0,7744              |
| 4  | 2,8    | −0,48           | 0,2304              |
| 5  | 3,1    | −0,18           | 0,0324              |
| 6  | 2,0    | −1,28           | 1,6384              |
| 7  | 6,2    | +2,92           | 8,5264              |
| 8  | 5,4    | +2,12           | 4,4944              |
| 9  | 3,6    | +0,32           | 0,1024              |
| 10 | 3,0    | −0,28           | 0,0784              |
| **Σ** | — | —               | **18,4360**         |

$$Q_y = 18{,}4360, \quad Q_{\text{ost}} = 13{,}3250$$

$$R^2 = 1 - \frac{Q_{\text{ost}}}{Q_y} = 1 - \frac{13{,}3250}{18{,}4360} = 1 - 0{,}7228 = 0{,}2772$$

$$R = \sqrt{0{,}2772} = 0{,}5265$$

$$R^2 = 0{,}2772, \quad R = 0{,}5265$$

---

### 2.4. Fisher F-Kriteriyasi

**Maqsad:** Model statistik jihatdan ahamiyatli ekanligini tekshirish.

**Formula:**

$$F_{\text{hisob}} = \frac{R^2 / k}{(1 - R^2) / (n - k - 1)}$$

bu yerda:
- $k = 1$ — regressiya parametrlari soni (b)
- $n = 10$ — kuzatuvlar soni
- $n - k - 1 = 10 - 1 - 1 = 8$ — erkinlik darajalari

**Hisoblash:**

$$F_{\text{hisob}} = \frac{0{,}2772 / 1}{(1 - 0{,}2772) / 8} = \frac{0{,}2772}{0{,}7228 / 8} = \frac{0{,}2772}{0{,}09035}$$

$$F_{\text{hisob}} = 3{,}07$$

**Jadval qiymati** ($\alpha = 0{,}05$, $k_1 = 1$, $k_2 = 8$):

$$F_{\text{jadval}}(1;\, 8;\, 0{,}05) = 5{,}32$$

**Qaror qoidasi:**

| Shart | Xulosa |
|-------|--------|
| $F_{\text{hisob}} > F_{\text{jadval}}$ | Model statistik jihatdan **ahamiyatli** |
| $F_{\text{hisob}} < F_{\text{jadval}}$ | Model statistik jihatdan **ahamiyatsiz** |

$$F_{\text{hisob}} = 3{,}07 < F_{\text{jadval}} = 5{,}32$$

> ❌ **Xulosa:** $F_{\text{hisob}} < F_{\text{jadval}}$ — darajali funksiya modeli berilgan ma'lumotlar uchun **statistik jihatdan ahamiyatli emas** ($\alpha = 0{,}05$ darajasida).

---

## Yakuniy Xulosa

| Ko'rsatkich | Qiymat | Baho |
|-------------|--------|------|
| Model | $\hat{y} = 1{,}0545 \cdot x^{0{,}659}$ | — |
| $a$ | 1,0545 | — |
| $b$ | 0,659 | — |
| $R$ (korrelyatsiya indeksi) | 0,5265 | O'rtacha bog'lanish |
| $R^2$ (determinatsiya) | 0,2772 | Model 27,7% ni tushuntiradi |
| $\bar{A}$ (o'rtacha xatolik) | 21,78% | **Qoniqarsiz** (> 15%) |
| $F_{\text{hisob}}$ | 3,07 | — |
| $F_{\text{jadval}}$ | 5,32 | — |
| Model ahamiyatliligi | $F < F_{\text{jadval}}$ | **Ahamiyatsiz** |

> 💡 **Tavsiya:** Ma'lumotlarni tekshirib chiqing — 7-kuzatuv ($x=6{,}2$, $y=6{,}2$) va 8-kuzatuv ($x=6{,}4$, $y=5{,}4$) anomal qiymatlar hisoblanadi. Ularni olib tashlash yoki boshqa model (masalan, ko'rsatkichli yoki polinom) tanlash natijani sezilarli yaxshilaydi.
