
// Hàm định dạng số có dấu phẩy ngăn cách đơn vị
function formatNumber(num) {
  return Math.round(num).toLocaleString('vi-VN');
}


function updateInputs() {
  let P = parseFloat(document.getElementById("perimeter").value);
  let slopeDeg = parseFloat(document.getElementById("slope").value);
  let roofStyleVal = document.getElementById("roofStyle").value;
  let materialSelect = document.getElementById("roofMaterial");
  let price = parseFloat(materialSelect?.options[materialSelect.selectedIndex]?.getAttribute("data-price")) || 0;

  if (isNaN(P) || isNaN(slopeDeg) || P <= 0 || slopeDeg <= 0) {
    document.getElementById("dientich").value = "";
    document.getElementById("dongia").value = "";
    document.getElementById("thanhtien").value = "";
    return;
  }

  let W = P / 5;
  let L = 3 * P / 10;
  if (roofStyleVal === "roi") {
    L += 1;
    W += 1;
  }

  let slopeRad = slopeDeg * Math.PI / 180;
  let roofArea = L * W * Math.sqrt(1 + Math.tan(slopeRad) ** 2);
  let thanhTien = roofArea * price;

  document.getElementById("dientich").value = formatNumber(roofArea);
  document.getElementById("dongia").value = formatNumber(price);
  document.getElementById("thanhtien").value = formatNumber(thanhTien);
}

function calculateMaterials() {

  let P = parseFloat(document.getElementById("perimeter").value);
  let slopeDeg = parseFloat(document.getElementById("slope").value);
  let roofStyleVal = document.getElementById("roofStyle").value;

  if (isNaN(P) || isNaN(slopeDeg) || P <= 0 || slopeDeg <= 0) {
    alert("Vui lòng nhập dữ liệu hợp lệ!");
    return;
  }

  // Tính L và W theo tỉ lệ L = 1.5 * W => P = 2(L + W) => W = P / 5, L = 3P / 10
  let W = P / 5;
  let L = 3 * P / 10;

  // Nếu mái rơi, cộng thêm 1m (0.5m mỗi bên) cho cả L và W
  if (roofStyleVal === "roi") {
    L += 1;
    W += 1;
  }

  let slopeRad = slopeDeg * Math.PI / 180;
  let roofArea = L * W * Math.sqrt(1 + Math.tan(slopeRad) ** 2);
  let numTrusses = Math.floor(L / 1.1) + 1;
  let H = Math.tan(slopeRad) * (W / 2);
  let D = Math.sqrt((W / 2) ** 2 + H ** 2);
  let trussMeter = 2 * D + W;
  let totalTruss = trussMeter * numTrusses;
  let numPurlinRows = Math.floor(D / 0.34) + 1;
  let totalPurlin = 2 * numPurlinRows * L;

  let resultDiv = document.getElementById("result");
  resultDiv.innerHTML = `
    <table>
      <tr>
        <th>Hạng mục</th>
        <th>Khối lượng</th>
        <th>Đơn giá</th>
        <th>Thành tiền</th>
      </tr>
      <tr>
        <td><select id="trussSelect" onchange="updateTrussMaterial()">
              <option value="C7575">Thanh C7575</option>
              <option value="C7510">Thanh C7510</option>
              <option value="C10075">Thanh C10075</option>
              <option value="C10010">Thanh C10010</option>
              <option value="BC4075">Thanh BC4075</option>
            </select> (Kèo)
        </td>
        <td id="valTruss" class="right">${totalTruss.toFixed(2)}</td>
        <td><input type="number" id="priceTruss" oninput="updateCost('valTruss','priceTruss','costTruss')"></td>
        <td id="costTruss" class="right">0</td>
      </tr>
      <tr>
        <td><select id="purlinSelect" onchange="updatePurlinMaterial()">
              <option value="TS4048">Thanh TS4048</option>
              <option value="TS3548">Thanh TS3548</option>
              <option value="TS2048">Thanh TS2048</option>
              <option value="TS6148">Thanh TS6148</option>
              <option value="TS6175">Thanh TS6175</option>
            </select> (Mè)
        </td>
        <td id="valPurlin" class="right">${totalPurlin.toFixed(2)}</td>
        <td><input type="number" id="pricePurlin" oninput="updateCost('valPurlin','pricePurlin','costPurlin')"></td>
        <td id="costPurlin" class="right">0</td>
      </tr>
    </table>
    <p style="margin-top:10px; text-align:right;">
      <strong>Tổng cộng: <span id="grandTotal">0</span></strong>
    </p>
  `;

  // Cập nhật luôn diện tích + đơn giá + thành tiền bên trên nếu có
  document.getElementById("dientich").value = formatNumber(roofArea);
}

function updateCost(valueCellId, priceInputId, costCellId) {
  let value = parseFloat(document.getElementById(valueCellId).textContent) || 0;
  let price = parseFloat(document.getElementById(priceInputId).value) || 0;
  let cost = value * price;
  document.getElementById(costCellId).textContent = cost.toFixed(2);
  updateGrandTotal();
}

function updateTrussMaterial() {
  document.getElementById("priceTruss").value = "";
  document.getElementById("costTruss").textContent = "0";
  updateGrandTotal();
}

function updatePurlinMaterial() {
  document.getElementById("pricePurlin").value = "";
  document.getElementById("costPurlin").textContent = "0";
  updateGrandTotal();
}

function updateGrandTotal() {
  let costTruss = parseFloat(document.getElementById("costTruss").textContent) || 0;
  let costPurlin = parseFloat(document.getElementById("costPurlin").textContent) || 0;
  let grandTotal = costTruss + costPurlin;
  document.getElementById("grandTotal").textContent = grandTotal.toFixed(2);
}
