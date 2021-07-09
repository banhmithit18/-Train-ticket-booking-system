$(document).ready(function() {
	//add passenger
	$("#passengerCreate").click(function() {

		var passengerName = $("#passengerName").val();
		var passengerPhone = $("#passengerPhone").val();

		var passengerEmail = $("#passengerEmail").val();
		var passengerAddress = $("#passengerAddress").val();
		var json = {
			name: passengerName,
			phone: passengerPhone,
			email: passengerEmail,
			address: passengerAddress
		};
		$.ajax({
			type: "POST",
			contentType: "application/json",
			url: "/PassengerCreate",
			data: JSON.stringify(json),
			dataType: 'json',
			cache: false,
			timeout: 600000,
			success: function(data) {
				if (data != null) {
					//generate table data
					var dataTable = '<tr id="p' + data.id + '"> <td class="align-middle text-center"><span class="text-sm font-weight-bold">' + data.name + '</span></td><td class="align-middle text-center"><span class="text-secondary text-xs font-weight-bold">' + data.phone + '</span></td>';
					dataTable += '<td class="align-middle text-center"><span class="text-secondary text-xs font-weight-bold">' + data.email + '</span></td>';
					dataTable += '<td class="align-middle text-center"><span class="text-secondary text-xs font-weight-bold">' + data.address + '</span></td>';
					dataTable += '<td class="align-middle"><div class="ms-auto"><button class="btn btn-link text-danger text-gradient px-3 mb-0 passengerDelete" id="p' + data.id + '"><i class="far fa-trash-alt me-2"></i>Delete</button>';
					dataTable += '<button class="btn btn-link text-dark px-3 mb-0 passengerEditForm" id="p' + data.id + '" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><i class="fas fa-pencil-alt text-dark me-2" aria-hidden="true"></i>Edit</button>';
					dataTable += '</div></td></tr>';
					//add it to table
					$('#passengerTable > tbody:last-child').append(dataTable);
					//show that statio add success
					var dataSuccess = '<div class="alert alert-success alert-dismissible fade show" role="alert"> <strong>Success!</strong> Passenger ' + data.name + ' has been added! <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
					$('#passengerError').append(dataSuccess);
					///add event for the button
					$('#p' + data.id + ' .passengerDelete').click(DeletePassenger);
					$('#p' + data.id + ' .passengerEditForm').click(EditPassengerForm);
					//clear form
					$("#passengerName").val('');
					$("#passengerPhone").val('');
					$("#passengerEmail").val('');
					$("#passengerAddress").val('');

				}
			},
			error: function(e) {
				// if data is duplicate send error
				var dataError = '<div class="alert alert-danger alert-dismissible fade show" role="alert"> <strong>Error!</strong> Phone number is already exists! <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
				$('#passengerError').append(dataError);
			}
		});
	});
	//delete passenger
	$('.passengerDelete').click(function() {
		var idWithString = this.id;
		//substring to get the id only
		var id = idWithString.substr(1);

		$.ajax({
			type: "POST",
			contentType: "application/json",
			url: "/PassengerDelete",
			data: id,
			dataType: 'json',
			cache: false,
			timeout: 600000,
			success: function(data) {
				if (data != null) {
					//send infor if success
					var dataError = '<div class="alert alert-success alert-dismissible fade show" role="alert"> <strong>Success!</strong> Passenger ' + data.name + ' has been deleted  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
					$('#passengerError').append(dataError);
					//delete table 
					$("#p" + data.id).remove();
				}
			}, error: function(e) {
				var dataError = '<div class="alert alert-danger alert-dismissible fade show" role="alert"> <strong>Error!</strong> Cannot delete this passenger! <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
				$('#passengerError').append(dataError);
			}
		})
	});
	//edit form
	$("#passengerTable").on('click', '.passengerEditForm', function() {
		// get the current row
		var currentRow = $(this).closest("tr");
		///get value
		var name = currentRow.find("td:eq(0)").text(); // get current row 1st TD value
		name = name.trim();
		var phone = currentRow.find("td:eq(1)").text(); // get current row 2nd TD
		phone = phone.trim()
		var email = currentRow.find("td:eq(2)").text(); // get current row 3rd TD
		email = email.trim();
		var address = currentRow.find("td:eq(3)").text(); // get current row 3rd TD
		address = address.trim();
		// insert data to form
		$('#passengerNameEdit').val(name);
		$('#passengerPhoneEdit').val(phone);
		$('#passengerEmailEdit').val(email);
		$('#passengerAddressEdit').val(address);


	});
	// edit passenger
	$('#passengerEdit').click(function() {
		var passengerName = $("#passengerNameEdit").val();
		var passengerPhone = $("#passengerPhoneEdit").val();
		console.log(passengerPhone);
		var passengerEmail = $("#passengerEmailEdit").val();
		var passengerAddress = $("#passengerAddressEdit").val();
		var json = {
			name: passengerName,
			phone: passengerPhone,
			email: passengerEmail,
			address: passengerAddress
		};
		$.ajax({
			type: "POST",
			contentType: "application/json",
			url: "/PassengerEdit",
			data: JSON.stringify(json),
			dataType: 'json',
			cache: false,
			timeout: 600000,
			success: function(data) {

				if (data != null) {
					var currentRow = $('#p' + data.id).closest("tr");
					///replace value
					currentRow.find("td:eq(0) span:first").text(data.name); // get current row 1st TD value
					currentRow.find("td:eq(1) span:first").text(data.phone); // get current row 2nd TD
					currentRow.find("td:eq(2) span:first").text(data.email); // get current row 3rd TD
					currentRow.find("td:eq(3) span:first").text(data.phonenumber); // get current row 4th TD
					$('#staticBackdrop').modal('toggle');
					var dataError = '<div class="alert alert-success alert-dismissible fade show" role="alert"> <strong>Success!</strong> Passenger information has been saved! <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
					$('#passengerError').append(dataError);
				}
			}, error: function() {
				var dataError = '<div class="alert alert-danger alert-dismissible fade show" role="alert"> <strong>Error!</strong> Save failed! <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
				$('#passengerError').append(dataError);
			}
		})
	});

	//function delete for dynamic button
	function DeletePassenger() {
		var idWithString = this.id;
		//substring to get the id only
		var id = idWithString.substr(1);

		$.ajax({
			type: "POST",
			contentType: "application/json",
			url: "/PassengerDelete",
			data: id,
			dataType: 'json',
			cache: false,
			timeout: 600000,
			success: function(data) {
				if (data != null) {
					//send infor if success
					var dataError = '<div class="alert alert-success alert-dismissible fade show" role="alert"> <strong>Success!</strong> Passenger ' + data.name + ' has been deleted  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
					$('#passengerError').append(dataError);
					//delete table 
					$("#s" + data.id).remove();
				}
			}, error: function(e) {
				var dataError = '<div class="alert alert-danger alert-dismissible fade show" role="alert"> <strong>Error!</strong> Cannot delete this passenger! <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
				$('#passengerError').append(dataError);
			}
		})
	}


	//// not ajax but this is function of search train
	$(document).ready(function() {
		$("#passengerSearch").on("keyup", function() {
			var value = $(this).val().toLowerCase();
			$("#passengerTable tr").filter(function() {
				$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
			});
		});
	});
}
);