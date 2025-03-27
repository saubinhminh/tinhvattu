function calculateMaterials() {
    let length = parseFloat(document.getElementById("length").value);
    let width = parseFloat(document.getElementById("width").value);
    let roofType = document.getElementById("roofType").value;

    if (isNaN(length) || isNaN(width) || length <= 0 || width <= 0) {
        alert("Vui lòng nhập chiều dài và chiều rộng hợp lệ!");
        return;
    }

    let frameCount = Math.ceil((length * width) / 5); // Số khung kèo
    let xagolCount = Math.ceil((length * 2) + (width * 2)); // Số xà gồ
    let tonCount = Math.ceil(length * width * 1.1); // Diện tích tôn (tính dư 10%)

    let resultHTML = `<h3>Kết quả tính toán</h3>`;
    resultHTML += `<p><strong>Khung kèo:</strong> ${frameCount} bộ</p>`;
    resultHTML += `<p><strong>Xà gồ:</strong> ${xagolCount} thanh</p>`;
    resultHTML += `<p><strong>Tôn:</strong> ${tonCount} m²</p>`;

    document.getElementById("result").innerHTML = resultHTML;
}