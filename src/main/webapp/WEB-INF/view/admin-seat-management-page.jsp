<%@include file="../common/header.jspf"%>

<div class="container-fluid py-4">
	<div class="row">
		<div class="col-12">
			<div class="card mb-4">
				<ul class="nav nav-pills  mb-3" id="pills-tab" role="tablist">
					<!-- seat -->
					<li class="nav-link " role="presentation"><button
							class="nav-link " id="pills-seat-tab" data-bs-toggle="pill"
							data-bs-target="#pills-seat" role="tab"
							aria-controls="pills-seat" aria-selected="fasle">Seat
							Management</button></li>

					<!-- seat type -->
					<li class="nav-link" role="presentation">
						<button class="nav-link" id="pills-seattype-tab"
							data-bs-toggle="pill" data-bs-target="#pills-seattype"
							type="button" role="tab" aria-controls="pills-seattype"
							aria-selected="false">Seat Type Management</button>
					</li>
				</ul>
				<div class="tab-content" id="pills-tabContent">

					<!-- tab seat -->
					<div class="tab-pane fade p-3 show active" id="pills-seat" role="tabpanel"
						aria-labelledby="pills-seat-tab">

						<div id="seatError"></div>
						<div class="row p-3">
							<div class="card card-border mb-4">
								<div class="card-header pb-0">
									<div class="row">
										<div class="col-8">
											<h6>Seat</h6>
										</div>
										<div class="col-4">
											<div class="input-group">
												<span class="input-group-text text-body"><i
													class="fas fa-search" aria-hidden="true"></i></span> <input
													type="text" class="form-control" id="seatSearch"
													placeholder="Search here...">
											</div>
										</div>
									</div>
								</div>
								<div class="card-body px-0 pt-0 pb-2">
									<div class="table-responsive p-0 scroll">
										<!-- table seat -->
										<table class="table align-items-center mb-0" id="seatTable">
											<thead>
												<tr>
													<th
														class="text-center text-uppercase text-secondary text-xxs font-weight-bolder ">Name
													</th>
													<th
														class=" text-center text-uppercase text-secondary text-xxs font-weight-bolder  ps-2">Carriage
													</th>
													<th
														class=" text-center text-uppercase text-secondary text-xxs font-weight-bolder  ps-2">Seat
														Type</th>
													<th
														class=" text-center text-uppercase text-secondary text-xxs font-weight-bolder  ps-2">Price
													</th>
													<th
														class="text-center text-uppercase text-secondary text-xxs font-weight-bolder ">Status
													</th>
													<th class="text-secondary opacity-7"></th>
												</tr>
											</thead>
											<tbody>
												<c:forEach var="item" items="${seats}">
													<tr id="se${item.id}">
														<td class="align-middle text-center"><span
															class=" text-sm font-weight-bold">${item.name}</span></td>
														<td class="align-middle text-center"><span
															class="text-secondary text-xs font-weight-bold">${item.carriage.name}</span>
														</td>
														<td class="align-middle text-center"><span
															class="text-secondary text-xs font-weight-bold">${item.seat.name}</span>
														</td>
														<td class="align-middle text-center"><span
															class="text-secondary text-xs font-weight-bold">${item.price}</span>
														</td>
														<c:if test="${item.active eq true}">
															<td
																class="align-middle text-center text-sm seatStatusActive"
																id="se${item.id}"><span
																class="badge badge-sm bg-gradient-success">Active</span></td>
														</c:if>
														<c:if test="${item.active eq false }">
															<td
																class="align-middle text-center text-sm seatStatusDisable"
																id="se${item.id}"><span
																class="badge badge-sm bg-gradient-secondary">Maintenance</span>
															</td>
														</c:if>
														<td class="align-middle">
															<div class="ms-auto">
																<button
																	class="btn btn-link text-dark px-3 mb-0 seatEditForm"
																	id="se${item.id}" data-bs-toggle="modal"
																	data-bs-target="#staticBackdrop">
																	<i class="fas fa-pencil-alt text-dark me-2"
																		aria-hidden="true"></i>Edit
																</button>
																<c:if test="${item.active eq false}">
																	<button
																		class="btn btn-link text-dark px-3 mb-0 seatEnable"
																		id="se${item.id}">
																		<i class="fas fa-pencil-alt text-success me-2"
																			aria-hidden="true"></i>Enable
																	</button>
																</c:if>
																<c:if test="${item.active eq true}">
																	<button
																		class="btn btn-link text-dark px-3 mb-0 seatDisable"
																		id="se${item.id}">
																		<i class="fas fa-pencil-alt text-danger me-2"
																			aria-hidden="true"></i>Disable
																	</button>
																</c:if>
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

					<!-- tab  seat type management -->
					<div class="tab-pane fade  p-3" id="pills-seattype" role="tabpanel"
						aria-labelledby="pills-seattype-tab">
						<div class="row">
							<div class="col-12">
								<div class="card mb-4">
									<div class="card-header pb-0 p-3">
										<div class="row">
											<div class="col-md-6 d-flex align-items-center">
												<h6 class="mb-0">Seat Type Management</h6>
											</div>
										</div>
									</div>
									<div class="card-body p-3">
										<!-- input form -->
										<form>
											<div class="row">
												<div class="card mb-4">
													<div class="card-header pb-0">
														<h6>Add Seat Type</h6>
													</div>
													<div class="card-body px-0 pt-0 pb-2">
														<div class="row p-3">
															<div class=" col-6">
																<label for="seattypeName" class="form-label">Seat
																	Type name </label> <input type="text" class="form-control"
																	id="seattypeName" name="name"
																	placeholder="Seat Type name.." required>
															</div>
															<div class=" col-6">
																<label for="seattypeDescription" class="form-label">Description
																</label> <input class="form-control" id="seattypeDescription"
																	name="description" placeholder="Description.." required>
															</div>
															<div class=" col-2">
																<label for="seattypeActive" class="form-label">Active
																</label>
																<div class="form-check form-switch ps-0">
																	<input class="form-check-input ms-auto" type="checkbox"
																		id="seattypeActive" name="active">
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
											<div class="col-md-6 p-3">
												<button id="seattypeCreate"
													class="btn bg-gradient-dark mb-0" type="button">Submit</button>
											</div>
										</form>
										<!-- input form end  -->
									</div>
								</div>
							</div>
						</div>
						<div id="seattypeError"></div>
						<div class="row p-3">
							<div class="card card-border mb-4">
								<div class="card-header pb-0">
									<div class="row">
										<div class="col-8">
											<h6>Seat Type</h6>
										</div>
										<div class="col-4">
											<div class="input-group">
												<span class="input-group-text text-body"><i
													class="fas fa-search" aria-hidden="true"></i></span> <input
													type="text" class="form-control" id="seattypeSearch"
													placeholder="Search here...">
											</div>
										</div>
									</div>
								</div>
								<div class="card-body px-0 pt-0 pb-2">
									<div class="table-responsive p-0 scroll">
										<!-- table train -->
										<table class="table align-items-center mb-0 scroll"
											id="seattypeTable">
											<thead>
												<tr>
													<th
														class="text-center text-uppercase text-secondary text-xxs font-weight-bolder ">Seat
														type name</th>
													<th
														class=" text-center text-uppercase text-secondary text-xxs font-weight-bolder  ps-2">Description
													</th>
													<th
														class="text-center text-uppercase text-secondary text-xxs font-weight-bolder ">Status
													</th>
													<th class="text-secondary opacity-7"></th>
												</tr>
											</thead>
											<tbody>
												<c:forEach var="item" items="${seattypes}">
													<tr id="st${item.id}">
														<td class="align-middle text-center"><span
															class=" text-sm font-weight-bold">${item.name}</span></td>
														<td class="align-middle text-center"><span
															class="text-secondary text-xs font-weight-bold">${item.description}</span>
														</td>
														<c:if test="${item.active eq true}">
															<td
																class="align-middle text-center text-sm seattypeStatusActive"
																id="st${item.id}"><span
																class="badge badge-sm bg-gradient-success">Active</span></td>
														</c:if>
														<c:if test="${item.active eq false }">
															<td
																class="align-middle text-center text-sm seattypeStatusDisable"
																id="st${item.id}"><span
																class="badge badge-sm bg-gradient-secondary">Inactive</span>
															</td>
														</c:if>
														<td class="align-middle">
															<div class="ms-auto">
																<button
																	class="btn btn-link text-danger text-gradient px-3 mb-0 seattypeDelete"
																	id="st${item.id}">
																	<i class="far fa-trash-alt me-2"></i>Delete
																</button>
																<c:if test="${item.active eq false}">
																	<button
																		class="btn btn-link text-dark px-3 mb-0 seattypeEnable"
																		id="st${item.id}">
																		<i class="fas fa-pencil-alt text-success me-2"
																			aria-hidden="true"></i>Enable
																	</button>
																</c:if>
																<c:if test="${item.active eq true}">
																	<button
																		class="btn btn-link text-dark px-3 mb-0 seattypeDisable"
																		id="st${item.id}">
																		<i class="fas fa-pencil-alt text-danger me-2"
																			aria-hidden="true"></i>Disable
																	</button>
																</c:if>
															</div>
														</td>
													</tr>
												</c:forEach>
											</tbody>
										</table>
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
				<h5 class="modal-title" id="staticBackdropLabel">Edit Seat</h5>
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
										<label for="seatName" class="form-label">Seat name </label> <input
											type="text" class="form-control" id="seatNameEdit"
											name="name" placeholder="Name.." required disabled>
									</div>
									<div class=" col-6">
										<label for="seatCarriage" class="form-label">Carriage
										</label> <input type="text" class="form-control" id="seatCarriageEdit"
											name="name" placeholder="Name.." required disabled>
									</div>
								</div>
								<div class="row p-3">
									<div class=" col-6">
										<label for="seatSeatType" class="form-label">Seat Type
										</label> <select class="form-select" aria-label="Select seat type"
											id="seatSeatTypeEdit">
											<c:forEach var="item" items="${seatSeatTypes}">
												<option value="${item.id}">${item.name}</option>
											</c:forEach>
										</select>
									</div>
									<div class=" col-6">
										<label for="seatPrice" class="form-label">Price </label> <input
											type="number" class="form-control" id="seatPriceEdit"
											name="price" placeholder="Price">
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
				<button id="seatEdit" type="button" class="btn btn-primary">Save</button>
			</div>
		</div>
	</div>
</div>


<%@include file="../common/footer.jspf"%>