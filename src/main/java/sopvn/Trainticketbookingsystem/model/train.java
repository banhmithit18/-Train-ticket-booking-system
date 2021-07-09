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

@Entity
@Table(name = "train")
@EntityListeners(AuditingEntityListener.class)
public class train {
	private int id;
	private String name;
	private String serialnumber;
	private Boolean active;

    private List<routine> routine;
	private List<carriage> carriage;
	
	
	@OneToMany(mappedBy="train")
	public List<carriage> getCarriage() {
		return carriage;
	}

	public void setCarriage(List<carriage> carriage) {
		this.carriage = carriage;
	}

	@OneToMany(mappedBy = "train")
	public List<routine> getRoutine() {
		return routine;
	}

	public void setRoutine(List<routine> routine) {
		this.routine = routine;
	}

	@Column(name = "active", nullable = true)
	public Boolean getActive() {
		return active;
	}

	public void setActive(Boolean active) {
		this.active = active;
	}

	@Column(name = "serialnumber", nullable = true)
	public String getSerialnumber() {
		return serialnumber;
	}

	public void setSerialnumber(String serialnumber) {
		this.serialnumber = serialnumber;
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
