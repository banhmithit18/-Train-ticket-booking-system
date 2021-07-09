package sopvn.Trainticketbookingsystem.model;

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
import javax.persistence.Table;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "carriage")
@EntityListeners(AuditingEntityListener.class)
public class carriage {
	private int id;
	private String name;
	private int seatamount;
	private int trainid;
	private int type;
	private Boolean active;

	private train train;
	private List<seat> seat;
	
	
	@OneToMany(mappedBy = "carriage")
	public List<seat> getSeat() {
		return seat;
	}

	public void setSeat(List<seat> seat) {
		this.seat = seat;
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

	@Column(name = "name", nullable = true)
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	@Column(name = "seatamount", nullable = true)
	public int getSeatamount() {
		return seatamount;
	}

	public void setSeatamount(int seatamount) {
		this.seatamount = seatamount;
	}
	
	@Column(name = "trainid", nullable = true)
	public int getTrainid() {
		return trainid;
	}

	public void setTrainid(int trainid) {
		this.trainid = trainid;
	}
	
	@Column(name = "type", nullable = true)
	public int getType() {
		return type;
	}

	public void setType(int type) {
		this.type = type;
	}
	
	@Column(name = "active", nullable = true)
	public Boolean getActive() {
		return active;
	}

	public void setActive(Boolean active) {
		this.active = active;
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

