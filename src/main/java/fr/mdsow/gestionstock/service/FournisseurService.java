package fr.mdsow.gestionstock.service;

import fr.mdsow.gestionstock.domain.Fournisseur;
import fr.mdsow.gestionstock.repository.FournisseurRepository;
import fr.mdsow.gestionstock.service.dto.FournisseurDTO;
import fr.mdsow.gestionstock.service.mapper.FournisseurMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link fr.mdsow.gestionstock.domain.Fournisseur}.
 */
@Service
@Transactional
public class FournisseurService {

    private final Logger log = LoggerFactory.getLogger(FournisseurService.class);

    private final FournisseurRepository fournisseurRepository;

    private final FournisseurMapper fournisseurMapper;

    public FournisseurService(FournisseurRepository fournisseurRepository, FournisseurMapper fournisseurMapper) {
        this.fournisseurRepository = fournisseurRepository;
        this.fournisseurMapper = fournisseurMapper;
    }

    /**
     * Save a fournisseur.
     *
     * @param fournisseurDTO the entity to save.
     * @return the persisted entity.
     */
    public FournisseurDTO save(FournisseurDTO fournisseurDTO) {
        log.debug("Request to save Fournisseur : {}", fournisseurDTO);
        Fournisseur fournisseur = fournisseurMapper.toEntity(fournisseurDTO);
        fournisseur = fournisseurRepository.save(fournisseur);
        return fournisseurMapper.toDto(fournisseur);
    }

    /**
     * Update a fournisseur.
     *
     * @param fournisseurDTO the entity to save.
     * @return the persisted entity.
     */
    public FournisseurDTO update(FournisseurDTO fournisseurDTO) {
        log.debug("Request to update Fournisseur : {}", fournisseurDTO);
        Fournisseur fournisseur = fournisseurMapper.toEntity(fournisseurDTO);
        fournisseur = fournisseurRepository.save(fournisseur);
        return fournisseurMapper.toDto(fournisseur);
    }

    /**
     * Partially update a fournisseur.
     *
     * @param fournisseurDTO the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<FournisseurDTO> partialUpdate(FournisseurDTO fournisseurDTO) {
        log.debug("Request to partially update Fournisseur : {}", fournisseurDTO);

        return fournisseurRepository
            .findById(fournisseurDTO.getId())
            .map(existingFournisseur -> {
                fournisseurMapper.partialUpdate(existingFournisseur, fournisseurDTO);

                return existingFournisseur;
            })
            .map(fournisseurRepository::save)
            .map(fournisseurMapper::toDto);
    }

    /**
     * Get all the fournisseurs.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<FournisseurDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Fournisseurs");
        return fournisseurRepository.findAll(pageable).map(fournisseurMapper::toDto);
    }

    /**
     * Get one fournisseur by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<FournisseurDTO> findOne(Long id) {
        log.debug("Request to get Fournisseur : {}", id);
        return fournisseurRepository.findById(id).map(fournisseurMapper::toDto);
    }

    /**
     * Delete the fournisseur by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Fournisseur : {}", id);
        fournisseurRepository.deleteById(id);
    }
}
