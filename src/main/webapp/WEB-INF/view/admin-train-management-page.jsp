<%@include file="../common/header.jspf"%>

<div class="container-fluid py-4">
	<div class="row">
		<div class="col-12">
			<div class="card mb-4">
				<ul class="nav nav-pills  mb-3" id="pills-tab" role="tablist">


					<!-- carriage -->
					<li class="nav-link " role="presentation"><button
							class="nav-link " id="pills-carriage-tab" data-bs-toggle="pill"
							data-bs-target="#pills-carriage" role="tab"
							aria-controls="pills-carriage" aria-selected="fasle">Carriage
							Management</button></li>
					<!-- train -->
					<li class="nav-link " role="presentation"><button
							class="nav-link " id="pills-home-tab" data-bs-toggle="pill"
							data-bs-target="#pills-home" role="tab"
							aria-controls="pills-home" aria-selected="fasle">Train
							Management</button></li>



				</ul>
				<div class="tab-content" id="pills-tabContent">

					<!-- tab carriage management -->
					<div class="tab-pane fade p-3 show active" id="pills-carriage"
						role="tabpanel" aria-labelledby="pills-carriage-tab">
						<div class="row">
							<div class="col-12">
								<div class="card mb-4">
									<div class="card-header pb-0 p-3">
										<div class="row">
											<div class="col-md-6 d-flex align-items-center">
												<h6 class="mb-0">Carriage Management</h6>
											</div>
										</div>
									</div>
									<div class="card-body p-3">
										<!-- input form -->
										<form>
											<div class="row">
												<div class="card mb-4">
													<div class="card-header pb-0">
														<h6>Add Carriage</h6>
													</div>
													<div class="card-body px-0 pt-0 pb-2">
														<div class="row p-3">
															<div class=" col-6">
																<label for="carriageName" class="form-label">Carriage
																	name </label> <input type="text" class="form-control"
																	id="carriageName" name="name"
																	placeholder="Carriage Name.." required>
															</div>
															<div class=" col-6">
																<label for="carriageTrain" class="form-label">Train
																</label> <select class="form-select" aria-label="Select train"
																	id="carriageTrain">
																	<c:forEach var="item" items="${routineTrains}">
																		<option value="${item.id}">${item.serialnumber}</option>
																	</c:forEach>
																</select>
															</div>
															<div class=" col-6">
																<label for="carriageSeatAmount" class="form-label">Seat
																	Amount </label> <input type="number" class="form-control"
																	id="carriageSeatAmount" name="carriageSeatAmount"
																	placeholder="Seat amount.." required>
															</div>
															<div class=" col-2">
																<label for="carriageActive" class="form-label">Active
																</label>
																<div class="form-check form-switch ps-0">
																	<input class="form-check-input ms-auto" type="checkbox"
																		id="carriageActive" name="active" checked>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
											<div class="col-md-6 p-3">
												<button id="carriageCreate"
													class="btn bg-gradient-dark mb-0" type="button">Submit</button>
											</div>
										</form>
										<!-- input form end  -->
									</div>
								</div>
							</div>
						</div>
						<div id="carriageError"></div>
						<div class="row p-3">
							<div class="card card-border mb-4">
								<div class="card-header pb-0">
									<div class="row">
										<div class="col-8">
											<h6>Carriage</h6>
										</div>
										<div class="col-4">
											<div class="input-group">
												<span class="input-group-text text-body"><i
													class="fas fa-search" aria-hidden="true"></i></span> <input
													type="text" class="form-control" id="carriageSearch"
													placeholder="Search here...">
											</div>
										</div>
									</div>
								</div>
								<div class="card-body px-0 pt-0 pb-2">
									<div class="table-responsive p-0 scroll">
										<!-- table train -->
										<table class="table align-items-center mb-0"
											id="carriageTable">
											<thead>
												<tr>
													<th
														class="text-center text-uppercase text-secondary text-xxs font-weight-bolder ">Name
													</th>
													<th
														class=" text-center text-uppercase text-secondary text-xxs font-weight-bolder  ps-2">Train
													</th>
													<th
														class=" text-center text-uppercase text-secondary text-xxs font-weight-bolder  ps-2">Seat
														Amount</th>
													<th
														class="text-center text-uppercase text-secondary text-xxs font-weight-bolder ">Status
													</th>
													<th class="text-secondary opacity-7"></th>
												</tr>
											</thead>
											<tbody>
												<c:forEach var="item" items="${carriages}">
													<tr id="c${item.id}">
														<td class="align-middle text-center"><span
															class=" text-sm font-weight-bold">${item.name}</span></td>
														<td class="align-middle text-center"><span
															class="text-secondary text-xs font-weight-bold">${item.train.name}</span>
														</td>
														<td class="align-middle text-center"><span
															class="text-secondary text-xs font-weight-bold">${item.seatamount}</span>
														</td>
														<c:if test="${item.active eq true}">
															<td
																class="align-middle text-center text-sm carriageStatusActive"
																id="c${item.id}"><span
																class="badge badge-sm bg-gradient-success">Active</span></td>
														</c:if>
														<c:if test="${item.active eq false }">
															<td
																class="align-middle text-center text-sm carriageStatusDisable"
																id="c${item.id}"><span
																class="badge badge-sm bg-gradient-secondary">Maintenance</span>
															</td>
														</c:if>
														<td class="align-middle">
															<div class="ms-auto">
																<button
																	class="btn btn-link text-danger text-gradient px-3 mb-0 carriageDelete"
																	id="c${item.id}">
																	<i class="far fa-trash-alt me-2"></i>Delete
																</button>
																<c:if test="${item.active eq false}">
																	<button
																		class="btn btn-link text-dark px-3 mb-0 carriageEnable"
																		id="c${item.id}">
																		<i class="fas fa-pencil-alt text-success me-2"
																			aria-hidden="true"></i>Enable
																	</button>
																</c:if>
																<c:if test="${item.active eq true}">
																	<button
																		class="btn btn-link text-dark px-3 mb-0 carriageDisable"
																		id="t${item.id}">
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

					<!-- tab train management -->
					<div class="tab-pane fade p-3" id="pills-home" role="tabpanel"
						aria-labelledby="pills-home-tab">
						<div class="row">
							<div class="col-12">
								<div class="card mb-4">
									<div class="card-header pb-0 p-3">
										<div class="row">
											<div class="col-md-6 d-flex align-items-center">
												<h6 class="mb-0">Train Management</h6>
											</div>
										</div>
									</div>
									<div class="card-body p-3">
										<!-- input form -->
										<form>
											<div class="row">
												<div class="card mb-4">
													<div class="card-header pb-0">
														<h6>Add Train</h6>
													</div>
													<div class="card-body px-0 pt-0 pb-2">
														<div class="row p-3">
															<div class=" col-6">
																<label for="trainName" class="form-label">Train
																	name </label> <input type="text" class="form-control"
																	id="trainName" name="name" placeholder="Train name.."
																	required>
															</div>
															<div class=" col-6">
																<label for="trainSerialNumber" class="form-label">Train
																	name </label> <input type="text" class="form-control"
																	id="trainSerialNumber" name="serialnumber"
																	placeholder="Serial Number.." required>
															</div>
															<div class=" col-2">
																<label for="trainActive" class="form-label">Active
																</label>
																<div class="form-check form-switch ps-0">
																	<input class="form-check-input ms-auto" type="checkbox"
																		id="trainActive" name="active">
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
											<div class="col-md-6 p-3">
												<button id="trainCreate" class="btn bg-gradient-dark mb-0"
													type="button">Submit</button>
											</div>
										</form>
										<!-- input form end  -->
									</div>
								</div>
							</div>
						</div>
						<div id="trainError"></div>
						<div class="row p-3">
							<div class="card card-border mb-4">
								<div class="card-header pb-0">
									<div class="row">
										<div class="col-8">
											<h6>Train</h6>
										</div>
										<div class="col-4">
											<div class="input-group">
												<span class="input-group-text text-body"><i
													class="fas fa-search" aria-hidden="true"></i></span> <input
													type="text" class="form-control" id="trainSearch"
													placeholder="Search here...">
											</div>
										</div>
									</div>
								</div>
								<div class="card-body px-0 pt-0 pb-2">
									<div class="table-responsive p-0 scroll">
										<!-- table train -->
										<table class="table align-items-center mb-0" id="trainTable">
											<thead>
												<tr>
													<th
														class="text-center text-uppercase text-secondary text-xxs font-weight-bolder ">Train
														name</th>
													<th
														class=" text-center text-uppercase text-secondary text-xxs font-weight-bolder  ps-2">Train
														serial number</th>
													<th
														class="text-center text-uppercase text-secondary text-xxs font-weight-bolder ">Status
													</th>
													<th class="text-secondary opacity-7"></th>
												</tr>
											</thead>
											<tbody>
												<c:forEach var="item" items="${trains}">
													<tr id="t${item.id}">
														<td class="align-middle text-center"><span
															class=" text-sm font-weight-bold">${item.name}</span></td>
														<td class="align-middle text-center"><span
															class="text-secondary text-xs font-weight-bold">${item.serialnumber}</span>
														</td>
														<c:if test="${item.active eq true}">
															<td
																class="align-middle text-center text-sm trainStatusActive"
																id="t${item.id}"><span
																class="badge badge-sm bg-gradient-success">Active</span></td>
														</c:if>
														<c:if test="${item.active eq false }">
															<td
																class="align-middle text-center text-sm trainStatusDisable"
																id="t${item.id}"><span
																class="badge badge-sm bg-gradient-secondary">Maintenance</span>
															</td>
														</c:if>
														<td class="align-middle">
															<div class="ms-auto">
																<button
																	class="btn btn-link text-danger text-gradient px-3 mb-0 trainDelete"
																	id="t${item.id}">
																	<i class="far fa-trash-alt me-2"></i>Delete
																</button>
																<c:if test="${item.active eq false}">
																	<button
																		class="btn btn-link text-dark px-3 mb-0 trainEnable"
																		id="t${item.id}">
																		<i class="fas fa-pencil-alt text-success me-2"
																			aria-hidden="true"></i>Enable
																	</button>
																</c:if>
																<c:if test="${item.active eq true}">
																	<button
																		class="btn btn-link text-dark px-3 mb-0 trainDisable"
																		id="t${item.id}">
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
				</div>
			</div>
		</div>
	</div>
</div>




<%@include file="../common/footer.jspf"%>