# Đặt bàn online — Dāna Vegan House

Khách đặt bàn trên website (`/reserve`). Mỗi lượt đặt được lưu vào một Google Sheet, nhà hàng nhận email thông báo, và hệ thống không cho đặt khi quán đã đủ **30 khách cùng lúc** (tính cả khách đặt trước và khách vãng lai).

```
Khách → danaveganhouse.com/reserve → /api/booking (Vercel) → Google Apps Script → Google Sheet + email
Nhân viên → danaveganhouse.com/staff (mã PIN) ───────────────┘
```

- `Code.gs`: toàn bộ backend, chạy trên Google Apps Script.
- `../api/booking.ts`: cầu nối trên Vercel, giữ địa chỉ Apps Script không lộ ra trình duyệt và ghi IP người gửi để chặn spam.
- Website chỉ hiện form đặt bàn khi đã bật `VITE_BOOKING_ENABLED=true`. Trước đó các nút "Đặt bàn" vẫn gọi điện như cũ.

## Cài đặt (một lần, khoảng 10 phút)

1. **Dùng tài khoản Google của nhà hàng**, không dùng tài khoản cá nhân của nhân viên hay người làm web. Sheet, script và email gửi đi đều thuộc tài khoản này.
2. Tạo một Google Sheet mới, đặt tên ví dụ "Dāna – Đặt bàn".
3. Trong Sheet: **Tiện ích mở rộng → Apps Script**. Xoá code mẫu, dán toàn bộ nội dung `Code.gs`, bấm Lưu.
4. **Cài đặt dự án (biểu tượng bánh răng) → Thuộc tính tập lệnh → Thêm**:
   - `NOTIFY_EMAIL` = email nhận thông báo đặt bàn (nhiều email thì cách nhau bằng dấu phẩy).
   - `STAFF_PIN` = mã PIN cho trang nhân viên, **ít nhất 6 chữ số**.
5. Quay lại trình soạn code, chọn hàm `setup` ở thanh trên, bấm **Chạy**, rồi cấp quyền khi Google hỏi. Sheet sẽ có thêm tab **Bookings**.
6. **Triển khai → Tùy chọn triển khai mới → Loại: Ứng dụng web**:
   - Thực thi dưới dạng: **Tôi**
   - Người có quyền truy cập: **Bất kỳ ai** (không phải "Bất kỳ ai có tài khoản Google")
   - Bấm Triển khai, sao chép **URL ứng dụng web** (kết thúc bằng `/exec`).
7. Trên Vercel: **Project → Settings → Environment Variables**, thêm cho cả Production và Preview:
   - `BOOKING_API_URL` = URL vừa sao chép
   - `VITE_BOOKING_ENABLED` = `true`
8. Deploy lại website (Deployments → Redeploy), rồi đặt thử một bàn. Kiểm tra email đã đến, sau đó đổi trạng thái dòng thử thành `Huỷ`.

## Hằng ngày

**Khách vãng lai:** mở `danaveganhouse.com/staff` trên điện thoại hoặc máy ở quầy, nhập PIN, chọn số khách, bấm **Ghi nhận**. Trang tự cập nhật mỗi phút: số khách đang ngồi, chỗ trống từng khung giờ, danh sách hôm nay.

**Đặt qua điện thoại / Facebook:** thêm một dòng vào tab Bookings để hệ thống tính chỗ:

| Ngày | Giờ | Số khách | Tên | SĐT | Nguồn |
|---|---|---|---|---|---|
| 26/11/2026 | 19:00 | 6 | Chị Mai | 0912… | phone |

Ngày ghi dạng `26/11/2026` hoặc `2026-11-26`, giờ dạng `19:00`. Các cột khác có thể để trống.

**Huỷ, khách không đến, khách về sớm:** sửa cột **Trạng thái** thành `Huỷ`, `Không đến` hoặc `Đã về`. Dòng đó không còn giữ chỗ nữa. Không cần xoá dòng.

## Quy tắc đang dùng

Các số này nằm ở đầu `Code.gs` và có thể đổi:

| Quy tắc | Giá trị |
|---|---|
| Sức chứa tối đa cùng lúc | 30 khách |
| Thời gian mỗi bàn được tính là đang ngồi | 2 tiếng |
| Khung giờ đặt online | 11:00 – 20:30, mỗi 30 phút |
| Số khách tối đa mỗi lượt đặt online | 10 (đông hơn thì gọi điện) |
| Đặt trước tối đa | 60 ngày |
| Đặt muộn nhất | 30 phút trước giờ đến |
| Một số điện thoại | tối đa 2 lượt đặt mỗi ngày |
| Một địa chỉ IP | tối đa 3 lượt đặt thành công mỗi 6 tiếng |
| Nhập sai PIN | 10 lần từ một IP thì khoá 10 phút |

Sau khi sửa `Code.gs`: **Triển khai → Quản lý các bản triển khai → Chỉnh sửa → Phiên bản: Phiên bản mới → Triển khai**. URL không đổi, không cần sửa gì trên Vercel.

## Giới hạn cần biết

- Tài khoản Gmail thường gửi được khoảng 100 email mỗi ngày qua Apps Script. Nếu vượt, đặt bàn vẫn được lưu vào Sheet, chỉ không có email.
- Thời gian ngồi được tính cố định 2 tiếng. Nếu bàn về sớm, đổi trạng thái thành `Đã về` để mở lại chỗ.
- Nếu thấy đặt bàn rác: đổi trạng thái thành `Huỷ`. Nếu bị spam nhiều, báo người phụ trách web để siết giới hạn.

## Kiểm thử code

```bash
node --test booking/Code.test.mjs
```

`gas-stub.mjs` chạy đúng file `Code.gs` trong Node với Sheet, email, cache giả lập.
