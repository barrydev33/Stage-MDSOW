package fr.mdsow.gestionstock.service.mapper;

import static fr.mdsow.gestionstock.domain.FournisseurAsserts.*;
import static fr.mdsow.gestionstock.domain.FournisseurTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class FournisseurMapperTest {

    private FournisseurMapper fournisseurMapper;

    @BeforeEach
    void setUp() {
        fournisseurMapper = new FournisseurMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getFournisseurSample1();
        var actual = fournisseurMapper.toEntity(fournisseurMapper.toDto(expected));
        assertFournisseurAllPropertiesEquals(expected, actual);
    }
}
