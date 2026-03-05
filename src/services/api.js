import axios from "axios";

const API_BASE_URL =
  "https://api-tao-phim-330259691464.asia-southeast1.run.app/api";

export const generateFilm = async (prompt, onProgressUpdate) => {
  try {
    if (onProgressUpdate) onProgressUpdate(0);

    const response = await axios.post(`${API_BASE_URL}/generate-film`, {
      prompt: prompt,
    });

    // Chỉ tiếp tục khi Backend thực sự báo success: true
    if (response.data && response.data.success === true) {
      // Chạy thanh tiến trình cho giao diện
      if (onProgressUpdate) {
        onProgressUpdate(1);
        await new Promise((r) => setTimeout(r, 1000));
        onProgressUpdate(2);
        await new Promise((r) => setTimeout(r, 1000));
        onProgressUpdate(3);
        await new Promise((r) => setTimeout(r, 500));
        onProgressUpdate(4);
      }

      // Trả thẳng dữ liệu thật từ Backend, KHÔNG gán link video giả nữa
      return response.data.data;
    } else {
      throw new Error("Lỗi định dạng dữ liệu từ Server.");
    }
  } catch (error) {
    console.error("❌ API Error:", error);

    // Bắt chính xác thông báo lỗi từ Backend (ví dụ: "Tạo ảnh thất bại...")
    if (error.response && error.response.data && error.response.data.error) {
      throw new Error(error.response.data.error);
    }

    // Lỗi mạng hoặc server sập
    throw new Error(
      error.message || "Không thể xử lý yêu cầu. Vui lòng thử lại!",
    );
  }
};
