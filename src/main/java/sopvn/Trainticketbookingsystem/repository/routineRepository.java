package sopvn.Trainticketbookingsystem.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import sopvn.Trainticketbookingsystem.model.routine;

public interface routineRepository extends JpaRepository<routine, Integer> {

  routine findById(int id);
  routine findByName(String name);
  List<routine> findByActiveTrue();
	
}