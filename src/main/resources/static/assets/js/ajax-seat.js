$(document).ready(function() {



	//edit form
	$("#seatTable").on('click', '.seatEditForm', function() {
		// get the current row
		var currentRow = $(this).closest("tr");
		///get value
		var name = currentRow.find("td:eq(0)").text(); // get current row 1st TD value
		name = name.trim();
		var carriage = currentRow.find("td:eq(1)").text(); // get current row 2nd TD
		carriage = carriage.trim()
		var seattype = currentRow.find("td:eq(2)").text(); // get current row 3rd TD
		seattype = seattype.trim();
		var price = currentRow.find("td:eq(3)").text(); // get current row 3rd TD
		price = price.trim();
		// insert data to form
		$('#seatNameEdit').val(name);
		$('#seatCarriageEdit').val(carriage);
		$('#seatPriceEdit').val(price);
		$("#seatSeatTypeEdit option").filter(function() {
			//may want to use $.trim in here
			return $(this).text() == seattype;
		}).prop('selected', true);


	});
	// edit passenger
	$('#seatEdit').click(function() {
		var seatName = $("#seatNameEdit").val();
		var seatSeatType = $("#seatSeatTypeEdit").val();
		var seatPrice = $("#seatPriceEdit").val();
		var json = {
			name: seatName,
			seattype: seatSeatType,
			price: seatPrice,

		};
		$.ajax({
			type: "POST",
			contentType: "application/json",
			url: "/SeatEdit",
			data: JSON.stringify(json),
			dataType: 'json',
			cache: false,
			timeout: 600000,
			success: function(data) {

				if (data != null) {
					var currentRow = $('#se' + data.id).closest("tr");
					///replace value
					currentRow.find("td:eq(2) span:first").text(data.seattype); // get current row 3rd TD
					currentRow.find("td:eq(3) span:first").text(data.price); // get current row 4th TD
					$('#staticBackdrop').modal('toggle');
					var dataError = '<div class="alert alert-success alert-dismissible fade show" role="alert"> <strong>Success!</strong> Seat has been saved! <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
					$('#seatError').append(dataError);
				}
			}, error: function() {
				var dataError = '<div class="alert alert-danger alert-dismissible fade show" role="alert"> <strong>Error!</strong> Save failed! <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
				$('#seatError').append(dataError);
			}
		})
	});


	// enable carriage
	$('.seatEnable').click(function() {
		var idWithString = this.id;
		//substring to get the id only
		var id = idWithString.substr(2);
		$.ajax({
			type: "POST",
			contentType: "application/json",
			url: "/SeatEnable",
			data: id,
			dataType: 'json',
			cache: false,
			timeout: 600000,
			success: function(data) {
				if (data != null) {
					//send infor if success
					var dataError = '<div class="alert alert-success alert-dismissible fade show" role="alert"> <strong>Success!</strong> Seat ' + data.name + ' has been enabled  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
					$('#seatError').append(dataError);
					//change status row

					//generate row
					var dataRowStatusColumn = '<td class="align-middle text-center text-sm seatStatusActive" id="se' + data.id + '"><span class="badge badge-sm bg-gradient-success">Active</span></td>';
					var dataRowEditColumn = '<button class="btn btn-link text-dark px-3 mb-0 seatDisable" id="se' + data.id + '"><i class="fas fa-pencil-alt text-danger me-2"aria-hidden="true"></i>Disable </button>';
					//replace current row
					$("#se" + data.id + ".seatEnable").replaceWith(dataRowEditColumn);
					$("#se" + data.id + ".seatStatusDisable").replaceWith(dataRowStatusColumn);
					//add event
					$('#se' + data.id + ' .seatDisable').click(DisableSeat);
				}
			}, error: function() {
				var dataError = '<div class="alert alert-danger alert-dismissible fade show" role="alert"> <strong>Error!</strong> Cannot enable this seat! <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
				$('#seatError').append(dataError);
			}
		})
	});
	//disable carriage
	$('.seatDisable').click(function() {
		var idWithString = this.id;
		//substring to get the id only
		var id = idWithString.substr(2);
		$.ajax({
			type: "POST",
			contentType: "application/json",
			url: "/SeatDisable",
			data: id,
			dataType: 'json',
			cache: false,
			timeout: 600000,
			success: function(data) {
				console.log(data);
				if (data != null) {
					//send infor if success
					var dataError = '<div class="alert alert-success alert-dismissible fade show" role="alert"> <strong>Success!</strong> Seat ' + data.name + ' has been disabled  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
					$('#seatError').append(dataError);
					//change status row
					//generate row
					var dataRowStatusColumn = '<td class="align-middle text-center text-sm seatStatusDisable" id="se' + data.id + '"><span class="badge badge-sm bg-gradient-secondary">Maintenance</span></td>';
					var dataRowEditColumn = '<button class="btn btn-link text-dark px-3 mb-0 seatEnable" id="se' + data.id + '"><i class="fas fa-pencil-alt text-success me-2"aria-hidden="true"></i>Enable </button>';
					//replace current row
					$("#se" + data.id + ".seatDisable").replaceWith(dataRowEditColumn);
					$("#se" + data.id + ".seatStatusActive").replaceWith(dataRowStatusColumn);
					//add event
					$('#se' + data.id + ' .seatEnable').click(EnableSeat);
				}
			}, error: function(e) {
				var dataError = '<div class="alert alert-danger alert-dismissible fade show" role="alert"> <strong>Error!</strong> Cannot disable this seat! <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
				$('#seatError').append(dataError)
			}
		})
	});

	//function enable for dynamic button
	function EnableSeat() {
		var idWithString = this.id;
		//substring to get the id only
		var id = idWithString.substr(2);
		$.ajax({
			type: "POST",
			contentType: "application/json",
			url: "/SeatEnable",
			data: id,
			dataType: 'json',
			cache: false,
			timeout: 600000,
			success: function(data) {
				if (data != null) {
					//send infor if success
					var dataError = '<div class="alert alert-success alert-dismissible fade show" role="alert"> <strong>Success!</strong> Seat ' + data.name + ' has been enabled  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
					$('#seatError').append(dataError);
					//change status row

					//generate row
					var dataRowStatusColumn = '<td class="align-middle text-center text-sm seatStatusActive" id="se' + data.id + '"><span class="badge badge-sm bg-gradient-success">Active</span></td>';
					var dataRowEditColumn = '<button class="btn btn-link text-dark px-3 mb-0 seatDisable" id="se' + data.id + '"><i class="fas fa-pencil-alt text-danger me-2"aria-hidden="true"></i>Disable </button>';
					//replace current row
					$("#se" + data.id + ".seatEnable").replaceWith(dataRowEditColumn);
					$("#se" + data.id + ".seatStatusDisable").replaceWith(dataRowStatusColumn);
					//add event
					$('#se' + data.id + ' .seatDisable').click(DisableSeat);
				}
			}, error: function() {
				var dataError = '<div class="alert alert-danger alert-dismissible fade show" role="alert"> <strong>Error!</strong> Cannot enable this seat! <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
				$('#seatError').append(dataError);
			}
		})
	}
	//function disable for dynamic button
	function DisableSeat() {
		var idWithString = this.id;
		//substring to get the id only
		var id = idWithString.substr(2);
		$.ajax({
			type: "POST",
			contentType: "application/json",
			url: "/SeatDisable",
			data: id,
			dataType: 'json',
			cache: false,
			timeout: 600000,
			success: function(data) {
				console.log(data);
				if (data != null) {
					//send infor if success
					var dataError = '<div class="alert alert-success alert-dismissible fade show" role="alert"> <strong>Success!</strong> Seat ' + data.name + ' has been disabled  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
					$('#seatError').append(dataError);
					//change status row
					//generate row
					var dataRowStatusColumn = '<td class="align-middle text-center text-sm seatStatusDisable" id="se' + data.id + '"><span class="badge badge-sm bg-gradient-secondary">Maintenance</span></td>';
					var dataRowEditColumn = '<button class="btn btn-link text-dark px-3 mb-0 seatEnable" id="se' + data.id + '"><i class="fas fa-pencil-alt text-success me-2"aria-hidden="true"></i>Enable </button>';
					//replace current row
					$("#se" + data.id + ".seatDisable").replaceWith(dataRowEditColumn);
					$("#se" + data.id + ".seatStatusActive").replaceWith(dataRowStatusColumn);
					//add event
					$('#se' + data.id + ' .seatEnable').click(EnableSeat);
				}
			}, error: function(e) {
				var dataError = '<div class="alert alert-danger alert-dismissible fade show" role="alert"> <strong>Error!</strong> Cannot disable this seat! <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
				$('#seatError').append(dataError)
			}
		})
	}

	//// not ajax but this is function of search train
	$(document).ready(function() {
		$("#seatSearch").on("keyup", function() {
			var value = $(this).val().toLowerCase();
			$("#seatTable tr").filter(function() {
				$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
			});
		});
	});
}
);