package fr.mdsow.gestionstock.service.mapper;

import fr.mdsow.gestionstock.domain.Categorie;
import fr.mdsow.gestionstock.service.dto.CategorieDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Categorie} and its DTO {@link CategorieDTO}.
 */
@Mapper(componentModel = "spring")
public interface CategorieMapper extends EntityMapper<CategorieDTO, Categorie> {}
