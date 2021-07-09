package sopvn.Trainticketbookingsystem.model;

import java.sql.Time;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "routine")
@EntityListeners(AuditingEntityListener.class)
public class routine {
	private int id;
	private String name;
	private int trainid;
	private int stationstart;
	private int stationend;
	private Time departuretime;
	private Time arrivaltime;
	private int distance;
	private Boolean active;

	private train train;
	private station station_start;
	private station station_end;
	private List<schedule> schedule;

	@OneToMany(mappedBy = "routine")
	public List<schedule> getSchedule() {
		return schedule;
	}

	public void setSchedule(List<schedule> schedule) {
		this.schedule = schedule;
	}

	@Column(name = "name", nullable = true)
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@JsonIgnore
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "stationstart", referencedColumnName = "id", insertable = false, updatable = false)
	@OnDelete(action = OnDeleteAction.CASCADE)
	public station getStation_start() {
		return station_start;
	}

	public void setStation_start(station station_start) {
		this.station_start = station_start;
	}

	@JsonIgnore
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "stationend", referencedColumnName = "id", insertable = false, updatable = false)
	@OnDelete(action = OnDeleteAction.CASCADE)
	public station getStation_end() {
		return station_end;
	}

	public void setStation_end(station station_end) {
		this.station_end = station_end;
	}

	@JsonIgnore
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "trainid", referencedColumnName = "id", insertable = false, updatable = false)
	@OnDelete(action = OnDeleteAction.CASCADE)
	public train getTrain() {
		return train;
	}

	public void setTrain(train train) {
		this.train = train;
	}

	@Column(name = "active", nullable = true)
	public Boolean getActive() {
		return active;
	}

	public void setActive(Boolean active) {
		this.active = active;
	}

	@Column(name = "distance", nullable = true)
	public int getDistance() {
		return distance;
	}

	public void setDistance(int distance) {
		this.distance = distance;
	}

	@Column(name = "arrivaltime", nullable = true)
	public Time getArrivalTime() {
		return arrivaltime;
	}

	public void setArrivalTime(Time arrivaltime) {
		this.arrivaltime = arrivaltime;
	}

	@Column(name = "departuretime", nullable = true)
	public Time getDepartureTime() {
		return departuretime;
	}

	public void setDepartureTime(Time departuretime) {
		this.departuretime = departuretime;
	}

	@Column(name = "stationend", nullable = true)
	public int getStationEnd() {
		return stationend;
	}

	public void setStationEnd(int stationend) {
		this.stationend = stationend;
	}

	@Column(name = "stationstart", nullable = true)
	public int getStationStart() {
		return stationstart;
	}

	public void setStationStart(int stationstart) {
		this.stationstart = stationstart;
	}

	@Column(name = "trainid", nullable = true)
	public int getTrainId() {
		return trainid;
	}

	public void setTrainId(int trainid) {
		this.trainid = trainid;
	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	/// return time in string
	public String departuretimeDisplay() {
		return departuretime.toString();
	}

	public String arrivaltimeDisplay() {
		return arrivaltime.toString();
	}

}
