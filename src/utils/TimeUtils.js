const validExpiresTime = (value, time = 15) => {
    console.log('time', time);
    if (!value) {
        return false
    }
    const specificTime = new Date(value);
    // Thời gian hiện tại
    const currentTime = new Date();
    // Tính toán khoảng thời gian giữa thời gian hiện tại và thời điểm cụ thể (tính bằng phút)
    const timeDiffInMinutes = (currentTime - specificTime) / (1000 * 60);
    // Kiểm tra xem thời gian đã vượt qua time phút chưa
    if (timeDiffInMinutes > time) {
        return false
    }
    return true
}
module.exports = {
    validExpiresTime
}