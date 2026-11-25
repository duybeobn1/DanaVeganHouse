# Đặt bàn online — Dāna Vegan House

Khách đặt bàn trên website (`/reserve`). Mỗi lượt đặt được lưu vào database Upstash Redis và báo ngay vào nhóm Telegram của nhân viên. Hệ thống không cho đặt khi quán đã đủ **30 khách cùng lúc**, tính cả khách đặt trước lẫn khách vãng lai.

```
Khách → danaveganhouse.com/reserve → /api/booking (Vercel) → Upstash Redis
                                          ↕
                         Bot Telegram ↔ nhóm nhân viên
```

- `../api/booking.ts`: toàn bộ backend. Phần website và bot Telegram dùng chung một địa chỉ.
- Website chỉ hiện form đặt bàn khi đã bật `VITE_BOOKING_ENABLED=true`. Trước đó các nút "Đặt bàn" vẫn gọi điện như cũ.

## Cài đặt (một lần, khoảng 10 phút)

1. **Tạo bot Telegram** (làm trên điện thoại):
   - Nhắn cho **@BotFather**, gõ `/newbot`, đặt tên (ví dụ "Dāna Đặt Bàn") và username kết thúc bằng `bot`.
   - BotFather gửi một **token** dạng `123456789:AA…`. Giữ kín token này, không gửi vào nhóm.
   - Tạo một nhóm Telegram cho nhân viên (ví dụ "Dāna – Đặt bàn") và thêm bot vào nhóm.
2. **Tạo database trong Vercel**: project `dana-vegan-house` → **Storage → Create Database → Upstash for Redis**.
   - Chọn gói **Free** và region gần Việt Nam nhất (Singapore nếu có).
   - Kết nối database với project cho cả **Production, Preview và Development**.
   - Vào **Settings → Environment Variables** kiểm tra đã có `KV_REST_API_URL` và `KV_REST_API_TOKEN`. Nếu tên là `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` cũng được.
3. **Thêm biến môi trường** (Settings → Environment Variables):
   - `TELEGRAM_BOT_TOKEN` = token ở bước 1, cho **Production và Preview**.
   - `VITE_BOOKING_ENABLED` = `true`, **chỉ cho Preview** lúc này để thử trước.
4. **Merge PR vào `main`.** Website chính tự deploy lại. Form đặt bàn vẫn ẩn vì Production chưa bật `VITE_BOOKING_ENABLED`.
   - Bot phải nối với tên miền chính, vì Telegram không gọi được vào link preview (link preview cần đăng nhập Vercel).
5. **Nối bot với website**: mở `https://danaveganhouse.com/api/booking?action=telegram-setup` trong trình duyệt. Thấy `"ok": true` là xong.
6. **Gắn nhóm**: chủ quán gõ `/batdau` trong nhóm Telegram. Bot trả lời "Đã gắn bot với nhóm này" kèm danh sách lệnh, và **người gõ `/batdau` thành chủ quán**.
   - Làm ngay sau bước 5: nhóm đầu tiên gõ `/batdau` sẽ được gắn và khoá lại. Sau đó chỉ chủ quán mới chuyển bot sang nhóm khác được.
   - Sau đó phân quyền cho chủ quán thứ hai và các quản lý ca (xem mục **Phân quyền**).
7. **Thử trên bản preview**: vào Vercel → Deployments, **Redeploy** bản Preview mới nhất để nó nhận biến môi trường, rồi mở link đó khi đã đăng nhập Vercel. Website chính và bản preview dùng chung database và bot.
   - Đặt một bàn và xem tin nhắn hiện trong nhóm.
   - Bấm **Huỷ** dưới tin nhắn đó.
   - Thử `/khach 2` và `/homnay`.
   - Đặt thêm một bàn rồi tự huỷ bằng mã ở cuối trang `/reserve`.
8. **Mở cho khách**: thêm `VITE_BOOKING_ENABLED` = `true` cho **Production**, rồi Redeploy bản Production.

## Hằng ngày (trong nhóm Telegram)

| Việc | Cách làm |
|---|---|
| Bàn đặt online | Hiện thành tin nhắn "Chờ xác nhận" có nút **✅ Xác nhận** và **Đã về · Không đến · Huỷ**. Gọi hoặc nhắn lại khách, rồi bấm **Xác nhận**: tin đổi thành "Đã xác nhận (tên người bấm)". Bàn vẫn được giữ chỗ ngay từ lúc khách đặt, kể cả khi chưa xác nhận. `/homnay` đánh dấu ⏳ các bàn chưa xác nhận. |
| Khách vãng lai | `/khach 5` (có thể thêm ghi chú: `/khach 5 bàn ngoài`). Bot báo số khách đang ngồi. Khi nhóm đó về, bấm **Đã về** dưới tin nhắn. |
| Khách gọi điện / nhắn Facebook | `/dat 26/11 19:00 6 Chị Mai 0912345678`. Ngày có thể ghi `nay` hoặc `mai`, giờ có thể ghi `19h` hoặc `19h30`, số điện thoại không bắt buộc. Nếu vượt 30 khách, chỉ quản lý ca hoặc chủ quán thêm được, và bot kèm cảnh báo. |
| Xem tình hình | `/homnay`, `/homnay mai`, `/homnay 26/11`: số khách đang ngồi, chỗ trống từng khung giờ, danh sách bàn. |
| Khách gọi điện xin huỷ | Quản lý ca gõ `/huy D1A2B3C` (mã có trong tin nhắn của bàn đó). |
| Khách tự huỷ | Khách nhập mã đặt bàn và số điện thoại ở cuối trang `/reserve`. Nhóm nhận tin "❌ Khách tự huỷ" và các nút ở tin gốc biến mất. Chỉ huỷ online được trước giờ đến. Việc khách tự huỷ không hoàn tác được. |
| Bấm nhầm | Sau khi bấm **Đã về**, **Không đến** hoặc **Huỷ** (hoặc gõ `/huy`), tin của bàn đó còn nút **↩️ Hoàn tác**. Quản lý ca hoặc chủ quán bấm nút này để đưa bàn về trạng thái trước và giữ chỗ lại. Nếu chỗ đã được nhường cho bàn khác, bot vẫn mở lại nhưng hiện cảnh báo vượt sức chứa. |

Bot chỉ nghe lệnh trong nhóm đã gắn. Người lạ nhắn cho bot sẽ không nhận được gì.

## Phân quyền

Có 3 vai trò. Ai trong nhóm mà chưa được phân quyền thì là **Nhân viên**.

| Việc | Nhân viên | Quản lý ca | Chủ quán |
|---|---|---|---|
| Nhận tin đặt bàn, xem `/homnay` | ✓ | ✓ | ✓ |
| Bấm **✅ Xác nhận** bàn đặt online | ✓ | ✓ | ✓ |
| Ghi khách vãng lai `/khach`, bấm **Đã về** | ✓ | ✓ | ✓ |
| Thêm bàn khách gọi điện `/dat` (còn chỗ) | ✓ | ✓ | ✓ |
| Bấm **Không đến**, **Huỷ**, gõ `/huy` | | ✓ | ✓ |
| Bấm **↩️ Hoàn tác** | | ✓ | ✓ |
| `/dat` khi đã vượt 30 khách | | ✓ | ✓ |
| Đổi quyền `/quyen` | | | ✓ |
| Chuyển bot sang nhóm khác (`/batdau` ở nhóm mới) | | | ✓ |

**Cách đổi quyền** (chỉ chủ quán): nhờ người đó nhắn một tin bất kỳ trong nhóm, rồi **trả lời (reply)** tin đó bằng:
- `/quyen chu`: thành chủ quán (có thể có nhiều chủ quán).
- `/quyen quanly`: thành quản lý ca.
- `/quyen nhanvien`: về lại nhân viên.

Gõ `/quyen` (không reply) để xem ai đang giữ quyền gì. Quán luôn phải còn ít nhất một chủ quán.

Khi có người nghỉ việc: xoá người đó khỏi nhóm Telegram là họ không dùng được bot nữa. Nếu họ là quản lý ca hoặc chủ quán, trước khi xoá hãy reply một tin cũ của họ bằng `/quyen nhanvien`, để nếu sau này họ được thêm lại vào nhóm thì không còn giữ quyền cũ.

## Quy tắc đang dùng

Các số này nằm ở đầu `api/booking.ts` và có thể đổi:

| Quy tắc | Giá trị |
|---|---|
| Sức chứa tối đa cùng lúc | 30 khách |
| Thời gian mỗi bàn được tính là đang ngồi | 2 tiếng |
| Khung giờ đặt online | 11:00 – 20:30, mỗi 30 phút |
| Số khách tối đa mỗi lượt đặt online | 10 (đông hơn thì gọi điện hoặc email danaveganhouse@gmail.com) |
| Đặt trước tối đa | 60 ngày |
| Đặt muộn nhất | 30 phút trước giờ đến |
| Một số điện thoại | tối đa 2 lượt đặt mỗi ngày |
| Một địa chỉ IP | tối đa 3 lượt đặt thành công mỗi 6 tiếng |
| Khách tự huỷ | cần đúng mã + số điện thoại; tối đa 10 lần thử mỗi giờ từ một IP |

## Dữ liệu

- Xem dữ liệu: Vercel → Storage → database → **Open in Upstash → Data Browser**. Mỗi ngày là một mục `day:2026-11-26`.
- Đổi sang nhóm Telegram khác (kể cả khi nhóm cũ đã bị xoá): chủ quán thêm bot vào nhóm mới rồi gõ `/batdau` ở đó. Quyền gắn với từng người nên vẫn giữ nguyên. Tin đặt bàn cũ nằm lại ở nhóm cũ; muốn đổi trạng thái các bàn đó thì dùng `/huy` hoặc `/homnay` ở nhóm mới.
- Danh sách quyền nằm ở khoá `tg:roles`. Muốn phân quyền lại từ đầu: xoá cả `tg:chat` và `tg:roles`, rồi gõ `/batdau`; người gõ sẽ là chủ quán.
- Đổi bot (token mới): sửa `TELEGRAM_BOT_TOKEN` trên Vercel, Redeploy, rồi mở lại link ở bước 5.

## Giới hạn cần biết

- Thời gian ngồi được tính cố định 2 tiếng. Nếu bàn về sớm, bấm **Đã về** để mở lại chỗ.
- Nếu Telegram trục trặc, đặt bàn vẫn được lưu, chỉ thiếu tin nhắn. Dùng `/homnay` để kiểm tra.
- Hệ thống không gửi email; mọi thông báo đi qua Telegram.
- Nếu thấy đặt bàn rác: bấm **Huỷ**. Nếu bị spam nhiều, báo người phụ trách web để siết giới hạn.
- Gói Hobby (miễn phí) của Vercel chỉ dành cho mục đích phi thương mại. Website của quán nên dùng gói Pro.

## Kiểm thử code

```bash
node --test booking/
```

`fake-services.mjs` giả lập Upstash Redis và Telegram, để test chạy đúng file `api/booking.ts` mà không cần tài khoản thật.
