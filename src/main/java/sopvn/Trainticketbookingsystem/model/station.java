package sopvn.Trainticketbookingsystem.model;


import java.util.List;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "station")
@EntityListeners(AuditingEntityListener.class)
public class station {
	private int id;
	private String name;
	private Boolean active;
	private List<routine> station_start;
	private List<routine> station_end;

	@JsonIgnore
	@OneToMany(mappedBy = "station_start")
	public List<routine> getStation_start() {
		return station_start;
	}

	public void setStation_start(List<routine> station_start) {
		this.station_start = station_start;
	}
	
	@JsonIgnore
	@OneToMany(mappedBy = "station_end")
	public List<routine> getStation_end() {
		return station_end;
	}

	public void setStation_end(List<routine> station_end) {
		this.station_end = station_end;
	}

	@Column(name = "active", nullable = true)
	public Boolean getActive() {
		return active;
	}

	public void setActive(Boolean active) {
		this.active = active;
	}

	@Column(name = "name", nullable = true)
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

}
