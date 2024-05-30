package fr.mdsow.gestionstock.service.mapper;

import fr.mdsow.gestionstock.domain.Fournisseur;
import fr.mdsow.gestionstock.service.dto.FournisseurDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Fournisseur} and its DTO {@link FournisseurDTO}.
 */
@Mapper(componentModel = "spring")
public interface FournisseurMapper extends EntityMapper<FournisseurDTO, Fournisseur> {}
