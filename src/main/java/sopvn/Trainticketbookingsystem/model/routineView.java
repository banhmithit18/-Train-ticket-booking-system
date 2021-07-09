package sopvn.Trainticketbookingsystem.model;

public class routineView {
 private int id;
 private String name;
 private String train;
 private String stationStart;
 private String stationEnd;
 private String departureTime;
 private String arrivalTime;
 private int distance;
 
 
 public String getName() {
	return name;
}
public void setName(String name) {
	this.name = name;
}
public int getId() {
	return id;
}
public void setId(int id) {
	this.id = id;
}
public String getTrain() {
	return train;
}
public void setTrain(String train) {
	this.train = train;
}
public String getStationStart() {
	return stationStart;
}
public void setStationStart(String stationStart) {
	this.stationStart = stationStart;
}
public String getStationEnd() {
	return stationEnd;
}
public void setStationEnd(String stationEnd) {
	this.stationEnd = stationEnd;
}
public String getDepartureTime() {
	return departureTime;
}
public void setDepartureTime(String departureTime) {
	this.departureTime = departureTime;
}
public String getArrivalTime() {
	return arrivalTime;
}
public void setArrivalTime(String arrivalTime) {
	this.arrivalTime = arrivalTime;
}
public int getDistance() {
	return distance;
}
public void setDistance(int distance) {
	this.distance = distance;
}
public boolean isActive() {
	return active;
}
public void setActive(boolean active) {
	this.active = active;
}
private boolean active;
 
}
