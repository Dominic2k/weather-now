# 🌤️ Weather Now - Ứng dụng Dự báo Thời tiết Hiện đại

## 👋 Giới thiệu

**Weather Now** là một ứng dụng web xem thời tiết được thiết kế với giao diện hiện đại (Dark Mode), tối ưu trải nghiệm người dùng (UX) và đảm bảo tính thẩm mỹ cao (Pixel Perfect).

Ứng dụng cung cấp thông tin thời tiết chính xác theo thời gian thực, hỗ trợ định vị GPS tự động, tìm kiếm địa điểm thông minh và hiển thị chi tiết các chỉ số môi trường.

## 🚀 Tính năng nổi bật

* **📍 Định vị tự động (Geolocation):** Tự động phát hiện vị trí người dùng để hiển thị thời tiết ngay khi truy cập.
* **🔍 Tìm kiếm thông minh (Smart Search):**
    * Gợi ý địa điểm theo thời gian thực (Autocomplete) khi gõ.
    * Hỗ trợ Debounce để tối ưu hóa gọi API.
    * Xử lý các trạng thái: Đang tìm kiếm, Không tìm thấy kết quả.
* **🌡️ Dữ liệu thời tiết chi tiết:**
    * Nhiệt độ hiện tại, Cảm giác thực (Feels Like).
    * Độ ẩm, Tốc độ gió, Lượng mưa.
    * Tình trạng bầu trời (Mây, Mưa, Nắng...).
* **📅 Dự báo tương lai:**
    * **Hourly Forecast:** Dự báo chi tiết theo các mốc giờ trong ngày.
    * **Daily Forecast:** Dự báo tổng quan cho 5 ngày tiếp theo.
* **⚙️ Chuyển đổi đơn vị (Unit Conversion):** Dễ dàng chuyển đổi giữa độ C/F, km/h/mph, mm/inch ngay trên giao diện mà không cần tải lại trang.
* **🎨 Giao diện Responsive:** Hiển thị mượt mà trên cả Desktop, Tablet và Mobile.
* **✨ Hiệu ứng mượt mà:** Sử dụng Glassmorphism (hiệu ứng kính mờ) cho Header và các thẻ thông tin.

## 🛠️ Công nghệ sử dụng

* **Core:** [React JS](https://reactjs.org/) (Vite Build Tool)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Icons:** [Lucide React](https://lucide.dev/)
* **HTTP Client:** [Axios](https://axios-http.com/)
* **Date Formatting:** [Date-fns](https://date-fns.org/)
* **Data Source:** [OpenWeatherMap API](https://openweathermap.org/) (Current Weather, 5 Day Forecast, Geocoding).

## ⚙️ Cài đặt và Chạy dự án

Để chạy dự án này trên máy local, bạn làm theo các bước sau:

### 1. Clone repository
```bash
git clone [https://github.com/username-cua-ban/weather-now.git](https://github.com/username-cua-ban/weather-now.git)
cd weather-now
```

### 2. Cài đặt các thư viện (Dependencies)

```
npm install
```

### 3. Cấu hình biến môi trường
Tạo một file .env tại thư mục gốc của dự án và thêm API Key của OpenWeatherMap vào:

```
VITE_WEATHER_API_KEY=your_api_key_here
```
***(Lưu ý: Bạn cần đăng ký tài khoản miễn phí tại OpenWeatherMap để lấy Key)***

### 4. Chạy dự án (Development mode)

```
npm run dev
```

Truy cập đường dẫn hiển thị trong terminal (thường là http://localhost:5173) để xem kết quả.

🤝 Đóng góp

Mọi ý kiến đóng góp hoặc báo lỗi đều được hoan nghênh. Vui lòng tạo Issue hoặc Pull Request.

📄 License
Dự án này được phát hành dưới giấy phép MIT.

Made with ❤️ by [Pham Duc Dat]
