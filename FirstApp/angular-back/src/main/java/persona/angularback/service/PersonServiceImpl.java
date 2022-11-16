package persona.angularback.service;
import persona.angularback.dao.PersonDao;
import persona.angularback.model.Person;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PersonServiceImpl implements PersonService{

    @Autowired
    private PersonDao personDao;

    @Override
    public List<Person> findAll() {
        return personDao.findAll();
    }

    @Override
    public Person findById(int id) {
        return personDao.findById(id).orElseThrow();
    }

    @Override
    public Person save(Person person) {
        return personDao.save(person);
    }

    @Override
    public void delete(int id) {
        personDao.deleteById(id);
    }
}
