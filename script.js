document.addEventListener("DOMContentLoaded", function () {
    updateHeight(); // Đặt giá trị mặc định khi trang tải
});

function updateHeight() {
    let roofType = document.getElementById("roofType");
    let selectedOption = roofType.options[roofType.selectedIndex];
    let defaultHeight = selectedOption.getAttribute("data-height");
    document.getElementById("height").value = defaultHeight;
}

function calculateMaterials() {
    let length = parseFloat(document.getElementById("length").value);
    let width = parseFloat(document.getElementById("width").value);
    let height = parseFloat(document.getElementById("height").value);
    let roofType = document.getElementById("roofType").value;

    if (isNaN(length) || isNaN(width) || isNaN(height) || length <= 0 || width <= 0 || height <= 0) {
        alert("Vui lòng nhập kích thước hợp lệ!");
        return;
    }

    let frameCount = Math.ceil((length * width) / 5);
    let xagolCount = Math.ceil((length * 2) + (width * 2));
    let tonCount = Math.ceil(length * width * 1.1);
    let totalSteel = Math.ceil(frameCount * height * 1.2); // Ước tính tổng thép theo chiều cao

    let resultHTML = `<h3>Kết quả tính toán</h3>`;
    resultHTML += `<p><strong>Khung kèo:</strong> ${frameCount} bộ</p>`;
    resultHTML += `<p><strong>Xà gồ:</strong> ${xagolCount} thanh</p>`;
    resultHTML += `<p><strong>Tôn:</strong> ${tonCount} m²</p>`;
    resultHTML += `<p><strong>Tổng thép:</strong> ${totalSteel} kg</p>`;

    document.getElementById("result").innerHTML = resultHTML;
}
