package sopvn.Trainticketbookingsystem.model;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "seat")
@EntityListeners(AuditingEntityListener.class)
public class seat {
	private int id;
	private String name;
	private int carriageid;
	private Integer row;
	private Integer side;
	private int seattype;
	private float price;
	private Boolean active;
	
	private seattype seat;
	private carriage carriage;
	
	@JsonIgnore
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "seattypeid", referencedColumnName = "id", insertable = false, updatable = false)
	@OnDelete(action = OnDeleteAction.CASCADE)
	public seattype getSeat() {
		return seat;
	}

	public void setSeat(seattype seat) {
		this.seat = seat;
	}

	@JsonIgnore
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "carriageid", referencedColumnName = "id", insertable = false, updatable = false)
	@OnDelete(action = OnDeleteAction.CASCADE)
	public carriage getCarriage() {
		return carriage;
	}

	public void setCarriage(carriage carriage) {
		this.carriage = carriage;
	}

	@Column(name = "name", nullable = true)
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Column(name = "carriageid", nullable = true)
	public int getCarriageid() {
		return carriageid;
	}

	public void setCarriageid(int carriageid) {
		this.carriageid = carriageid;
	}

	@Column(name = "row", nullable = true)
	public Integer getRow() {
		return row;
	}

	public void setRow(Integer row) {
		this.row = row;
	}

	@Column(name = "side", nullable = true)
	public Integer getSide() {
		return side;
	}

	public void setSide(Integer side) {
		this.side = side;
	}

	@Column(name = "seattypeid", nullable = true)
	public int getSeattype() {
		return seattype;
	}

	public void setSeattype(int seattype) {
		this.seattype = seattype;
	}

	@Column(name = "price", nullable = true)
	public float getPrice() {
		return price;
	}

	public void setPrice(float price) {
		this.price = price;
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