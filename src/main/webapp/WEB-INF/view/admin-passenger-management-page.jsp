<%@include file="../common/header.jspf"%>
<div class="container-fluid py-4">
	<div class="row">
		<div class="col-12">
			<div class="card mb-4">
				<ul class="nav nav-pills  mb-3" id="pills-tab" role="tablist">
					<li class="nav-link" role="presentation"><button
							class="nav-link active" id="pills-passenger-tab"
							data-bs-toggle="pill" data-bs-target="#pills-passenger"
							role="tab" aria-controls="pills-passenger" aria-selected="true">Passenger
							Management</button></li>
				</ul>
				<div class="tab-content" id="pills-tabContent">
					<!-- tab-1 -->
					<div class="tab-pane fade show active p-3" id="pills-passenger"
						role="tabpanel" aria-labelledby="pills-passenger-tab">
						<div class="row">
							<div class="col-12">
								<div class="card mb-4">
									<div class="card-header pb-0 p-3">
										<div class="row">
											<div class="col-md-6 d-flex align-items-center">
												<h6 class="mb-0">Passenger Management</h6>
											</div>
										</div>
									</div>
									<div class="card-body p-3">
										<!-- input form -->
										<form>
											<div class="row">
												<div class="card mb-4">
													<div class="card-header pb-0">
														<h6>Add Passenger</h6>
													</div>
													<div class="card-body px-0 pt-0 pb-2">
														<div class="row p-3">
															<div class=" col-6">
																<label for="passengerName" class="form-label">Passenger
																	name </label> <input type="text" class="form-control"
																	id="passengerName" name="name" placeholder="Name.."
																	required>
															</div>
															<div class=" col-6">
																<label for="passengerPhone" class="form-label">Passenger
																	Phone Number </label> <input type="text" class="form-control"
																	id="passengerPhone" name="phone"
																	placeholder="Phone Number.." required>
															</div>
														</div>
														<div class="row p-3">
															<div class=" col-6">
																<label for="passengerEmail" class="form-label">Passenger
																	Email </label> <input type="email" class="form-control"
																	id="passengerEmail" name="email" placeholder="Email..">
															</div>
															<div class=" col-6">
																<label for="passengerAddress" class="form-label">Passenger
																	Address </label> <input type="text" class="form-control"
																	id="passengerAddress" name="address"
																	placeholder="Address..">
															</div>
														</div>
													</div>
												</div>
											</div>
											<div class="col-md-6 p-3">
												<button id="passengerCreate"
													class="btn bg-gradient-dark mb-0" type="button">Submit</button>
											</div>
										</form>
										<!-- input form end  -->
									</div>
								</div>
							</div>
						</div>
						<div id="passengerError"></div>
						<div class="row p-3">
							<div class="card card-border mb-4">
								<div class="card-header pb-0">
									<div class="row">
										<div class="col-8">
											<h6>Passenger</h6>
										</div>
										<div class="col-4">
											<div class="input-group">
												<span class="input-group-text text-body"><i
													class="fas fa-search" aria-hidden="true"></i></span> <input
													type="text" class="form-control" id="passengerSearch"
													placeholder="Search here...">
											</div>
										</div>
									</div>
								</div>
								<div class="card-body px-0 pt-0 pb-2">
									<div class="table-responsive p-0">
										<!-- table  -->
										<table class="table align-items-center mb-0"
											id="passengerTable">
											<thead>
												<tr>
													<th
														class="text-center text-uppercase text-secondary text-xxs font-weight-bolder ">Name
													</th>
													<th
														class=" text-center text-uppercase text-secondary text-xxs font-weight-bolder">Phone
													</th>
													<th
														class="text-center text-uppercase text-secondary text-xxs font-weight-bolder ">Email
													</th>
													<th
														class="text-center text-uppercase text-secondary text-xxs font-weight-bolder ">Address
													</th>
													<th class="text-secondary opacity-7"></th>
												</tr>
											</thead>
											<tbody>
												<c:forEach var="item" items="${passengers}">
													<tr id="p${item.id}">
														<td class="align-middle text-center"><span
															class="text-sm font-weight-bold">${item.name}</span></td>
														<td class="align-middle text-center"><span
															class="text-secondary text-xs font-weight-bold">${item.phone}</span>
														</td>
														<td class="align-middle text-center"><span
															class="text-secondary text-xs font-weight-bold">${item.email}</span>
														</td>
														<td class="align-middle text-center"><span
															class="text-secondary text-xs font-weight-bold">${item.address}</span>
														</td>

														<td class="align-middle">
															<div class="ms-auto">
																<button
																	class="btn btn-link text-danger text-gradient px-3 mb-0 passengerDelete"
																	id="p${item.id}">
																	<i class="far fa-trash-alt me-2"></i>Delete
																</button>
																<button
																	class="btn btn-link text-dark px-3 mb-0 passengerEditForm"
																	id="p${item.id}" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
																	<i class="fas fa-pencil-alt text-dark me-2"
																		aria-hidden="true"></i>Edit
																</button>
															</div>
														</td>
													</tr>
												</c:forEach>
											</tbody>
										</table>
										<!-- table end -->
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<!-- Modal -->
<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static"
	data-bs-keyboard="false" tabindex="-1"
	aria-labelledby="staticBackdropLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title" id="staticBackdropLabel">Edit Passenger</h5>
				<button type="button" class="btn-close" data-bs-dismiss="modal"
					aria-label="Close"></button>
			</div>
			<div class="modal-body">

				<form>
					<div class="row">
						<div class="card mb-4">
						
							<div class="card-body px-0 pt-0 pb-2">
								<div class="row p-3">
									<div class=" col-6">
										<label for="passengerName" class="form-label">Passenger
											name </label> <input type="text" class="form-control"
											id="passengerNameEdit" name="name" placeholder="Name.."
											required>
									</div>
									<div class=" col-6">
										<label for="passengerPhone" class="form-label">Passenger
											Phone Number </label> <input type="text" class="form-control"
											id="passengerPhoneEdit" name="phone"
											placeholder="Phone Number.." disabled>
									</div>
								</div>
								<div class="row p-3">
									<div class=" col-6">
										<label for="passengerEmail" class="form-label">Passenger
											Email </label> <input type="email" class="form-control"
											id="passengerEmailEdit" name="email" placeholder="Email..">
									</div>
									<div class=" col-6">
										<label for="passengerAddress" class="form-label">Passenger
											Address </label> <input type="text" class="form-control"
											id="passengerAddressEdit" name="address"
											placeholder="Address..">
									</div>
								</div>
							</div>
						</div>
					</div>
				</form>

			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-secondary"
					data-bs-dismiss="modal">Close</button>
				<button id="passengerEdit" type="button" class="btn btn-primary">Save</button>
			</div>
		</div>
	</div>
</div>


<%@include file="../common/footer.jspf"%>
