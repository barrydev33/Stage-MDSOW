package fr.mdsow.gestionstock.service.mapper;

import static fr.mdsow.gestionstock.domain.ApprovisionnementAsserts.*;
import static fr.mdsow.gestionstock.domain.ApprovisionnementTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class ApprovisionnementMapperTest {

    private ApprovisionnementMapper approvisionnementMapper;

    @BeforeEach
    void setUp() {
        approvisionnementMapper = new ApprovisionnementMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getApprovisionnementSample1();
        var actual = approvisionnementMapper.toEntity(approvisionnementMapper.toDto(expected));
        assertApprovisionnementAllPropertiesEquals(expected, actual);
    }
}
