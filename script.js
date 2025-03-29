document.addEventListener("DOMContentLoaded", function () {
  updateHeight(); // Đặt giá trị mặc định khi trang tải
});

function updateHeight() {
  let roofType = document.getElementById("roofType");
  let selectedOption = roofType.options[roofType.selectedIndex];
  let defaultHeight = selectedOption.getAttribute("data-height");
  document.getElementById("height").value = defaultHeight;
}

// Hàm tính toán kết quả
function calculateMaterials() {
  // Lấy giá trị đầu vào
  let L = parseFloat(document.getElementById("length").value);
  let W = parseFloat(document.getElementById("width").value);
  let H = parseFloat(document.getElementById("height").value);

  // Kiểm tra hợp lệ
  if (isNaN(L) || isNaN(W) || isNaN(H) || L <= 0 || W <= 0 || H <= 0) {
    alert("Vui lòng nhập kích thước hợp lệ!");
    return;
  }

  // 1. Diện tích nền & diện tích mái
  let floorArea = L * W;
  // Giữ nguyên cách tính cũ: mái tăng 10%
  let roofArea = floorArea * 1.1;

  // 2. Số kèo (khoảng cách 1,1m dọc chiều dài)
  let numTrusses = Math.floor(L / 1.1) + 1;

  // 3. Tính độ dốc mái (D) = sqrt((W/2)^2 + H^2)
  let D = Math.sqrt((W / 2) ** 2 + H ** 2);

  // Mỗi kèo tam giác:
  //  - 2 thanh chord trên (mỗi dài D)
  //  - 1 thanh chord dưới (dài W)
  // => 1 kèo = (2D + W) mét
  let trussMeter = 2 * D + W;
  let totalC7575 = trussMeter * numTrusses;

  // 4. Tính mè (khoảng cách 0,34m dọc theo dốc)
  //    Số hàng mè 1 dốc = floor(D / 0.34) + 1
  //    Mỗi hàng dài L, có 2 dốc => nhân 2
  let numPurlinRows = Math.floor(D / 0.34) + 1;
  let totalPurlin = 2 * numPurlinRows * L;

  // 5. Tạo bảng kết quả + input đơn giá
  let resultDiv = document.getElementById("result");
  // Xóa nội dung cũ (nếu có)
  resultDiv.innerHTML = "";

  // Tạo bảng HTML
  let tableHTML = `
    <table>
      <tr>
        <th>Hạng mục</th>
        <th>Khối lượng</th>
        <th>Đơn giá</th>
        <th>Thành tiền</th>
      </tr>
      <!-- Diện tích nền -->
      <tr>
        <td>Diện tích nền</td>
        <td id="valFloor" class="right">${floorArea.toFixed(2)}</td>
        <td><input type="number" id="priceFloor" placeholder="Đơn giá" oninput="updateCost('valFloor','priceFloor','costFloor')"></td>
        <td id="costFloor" class="right">0</td>
      </tr>
      <!-- Diện tích mái -->
      <tr>
        <td>Diện tích mái</td>
        <td id="valRoof" class="right">${roofArea.toFixed(2)}</td>
        <td><input type="number" id="priceRoof" placeholder="Đơn giá" oninput="updateCost('valRoof','priceRoof','costRoof')"></td>
        <td id="costRoof" class="right">0</td>
      </tr>
      <!-- Thanh C7575 -->
      <tr>
        <td>Thanh C7575 (khung kèo)</td>
        <td id="valC7575" class="right">${totalC7575.toFixed(2)}</td>
        <td><input type="number" id="priceC7575" placeholder="Đơn giá" oninput="updateCost('valC7575','priceC7575','costC7575')"></td>
        <td id="costC7575" class="right">0</td>
      </tr>
      <!-- Thanh TS4048 -->
      <tr>
        <td>Thanh TS4048 (mè)</td>
        <td id="valTS4048" class="right">${totalPurlin.toFixed(2)}</td>
        <td><input type="number" id="priceTS4048" placeholder="Đơn giá" oninput="updateCost('valTS4048','priceTS4048','costTS4048')"></td>
        <td id="costTS4048" class="right">0</td>
      </tr>
    </table>
    <p style="margin-top:10px;text-align:right;">
      <strong>Tổng cộng: 
        <span id="grandTotal">0</span>
      </strong>
    </p>
  `;

  resultDiv.innerHTML = tableHTML;
}

// Hàm cập nhật thành tiền khi người dùng nhập đơn giá
function updateCost(valueCellId, priceInputId, costCellId) {
  let value = parseFloat(document.getElementById(valueCellId).textContent) || 0;
  let price = parseFloat(document.getElementById(priceInputId).value) || 0;
  let cost = value * price;
  document.getElementById(costCellId).textContent = cost.toFixed(2);
  updateGrandTotal();
}

// Tính tổng cộng
function updateGrandTotal() {
  let costFloor = parseFloat(document.getElementById("costFloor").textContent) || 0;
  let costRoof = parseFloat(document.getElementById("costRoof").textContent) || 0;
  let costC7575 = parseFloat(document.getElementById("costC7575").textContent) || 0;
  let costTS4048 = parseFloat(document.getElementById("costTS4048").textContent) || 0;

  let grandTotal = costFloor + costRoof + costC7575 + costTS4048;
  document.getElementById("grandTotal").textContent = grandTotal.toFixed(2);
}
