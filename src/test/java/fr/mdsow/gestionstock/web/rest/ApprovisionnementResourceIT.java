package fr.mdsow.gestionstock.web.rest;

import static fr.mdsow.gestionstock.domain.ApprovisionnementAsserts.*;
import static fr.mdsow.gestionstock.web.rest.TestUtil.createUpdateProxyForBean;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import fr.mdsow.gestionstock.IntegrationTest;
import fr.mdsow.gestionstock.domain.Approvisionnement;
import fr.mdsow.gestionstock.repository.ApprovisionnementRepository;
import fr.mdsow.gestionstock.service.ApprovisionnementService;
import fr.mdsow.gestionstock.service.dto.ApprovisionnementDTO;
import fr.mdsow.gestionstock.service.mapper.ApprovisionnementMapper;
import jakarta.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link ApprovisionnementResource} REST controller.
 */
@IntegrationTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
class ApprovisionnementResourceIT {

    private static final Instant DEFAULT_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Long DEFAULT_QUANTITE = 1L;
    private static final Long UPDATED_QUANTITE = 2L;

    private static final String ENTITY_API_URL = "/api/approvisionnements";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ObjectMapper om;

    @Autowired
    private ApprovisionnementRepository approvisionnementRepository;

    @Mock
    private ApprovisionnementRepository approvisionnementRepositoryMock;

    @Autowired
    private ApprovisionnementMapper approvisionnementMapper;

    @Mock
    private ApprovisionnementService approvisionnementServiceMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restApprovisionnementMockMvc;

    private Approvisionnement approvisionnement;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Approvisionnement createEntity(EntityManager em) {
        Approvisionnement approvisionnement = new Approvisionnement().date(DEFAULT_DATE).quantite(DEFAULT_QUANTITE);
        return approvisionnement;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Approvisionnement createUpdatedEntity(EntityManager em) {
        Approvisionnement approvisionnement = new Approvisionnement().date(UPDATED_DATE).quantite(UPDATED_QUANTITE);
        return approvisionnement;
    }

    @BeforeEach
    public void initTest() {
        approvisionnement = createEntity(em);
    }

    @Test
    @Transactional
    void createApprovisionnement() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the Approvisionnement
        ApprovisionnementDTO approvisionnementDTO = approvisionnementMapper.toDto(approvisionnement);
        var returnedApprovisionnementDTO = om.readValue(
            restApprovisionnementMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(approvisionnementDTO)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            ApprovisionnementDTO.class
        );

        // Validate the Approvisionnement in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        var returnedApprovisionnement = approvisionnementMapper.toEntity(returnedApprovisionnementDTO);
        assertApprovisionnementUpdatableFieldsEquals(returnedApprovisionnement, getPersistedApprovisionnement(returnedApprovisionnement));
    }

    @Test
    @Transactional
    void createApprovisionnementWithExistingId() throws Exception {
        // Create the Approvisionnement with an existing ID
        approvisionnement.setId(1L);
        ApprovisionnementDTO approvisionnementDTO = approvisionnementMapper.toDto(approvisionnement);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restApprovisionnementMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(approvisionnementDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Approvisionnement in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkDateIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        approvisionnement.setDate(null);

        // Create the Approvisionnement, which fails.
        ApprovisionnementDTO approvisionnementDTO = approvisionnementMapper.toDto(approvisionnement);

        restApprovisionnementMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(approvisionnementDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkQuantiteIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        approvisionnement.setQuantite(null);

        // Create the Approvisionnement, which fails.
        ApprovisionnementDTO approvisionnementDTO = approvisionnementMapper.toDto(approvisionnement);

        restApprovisionnementMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(approvisionnementDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllApprovisionnements() throws Exception {
        // Initialize the database
        approvisionnementRepository.saveAndFlush(approvisionnement);

        // Get all the approvisionnementList
        restApprovisionnementMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(approvisionnement.getId().intValue())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].quantite").value(hasItem(DEFAULT_QUANTITE.intValue())));
    }

    @SuppressWarnings({ "unchecked" })
    void getAllApprovisionnementsWithEagerRelationshipsIsEnabled() throws Exception {
        when(approvisionnementServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restApprovisionnementMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(approvisionnementServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({ "unchecked" })
    void getAllApprovisionnementsWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(approvisionnementServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restApprovisionnementMockMvc.perform(get(ENTITY_API_URL + "?eagerload=false")).andExpect(status().isOk());
        verify(approvisionnementRepositoryMock, times(1)).findAll(any(Pageable.class));
    }

    @Test
    @Transactional
    void getApprovisionnement() throws Exception {
        // Initialize the database
        approvisionnementRepository.saveAndFlush(approvisionnement);

        // Get the approvisionnement
        restApprovisionnementMockMvc
            .perform(get(ENTITY_API_URL_ID, approvisionnement.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(approvisionnement.getId().intValue()))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()))
            .andExpect(jsonPath("$.quantite").value(DEFAULT_QUANTITE.intValue()));
    }

    @Test
    @Transactional
    void getNonExistingApprovisionnement() throws Exception {
        // Get the approvisionnement
        restApprovisionnementMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingApprovisionnement() throws Exception {
        // Initialize the database
        approvisionnementRepository.saveAndFlush(approvisionnement);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the approvisionnement
        Approvisionnement updatedApprovisionnement = approvisionnementRepository.findById(approvisionnement.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedApprovisionnement are not directly saved in db
        em.detach(updatedApprovisionnement);
        updatedApprovisionnement.date(UPDATED_DATE).quantite(UPDATED_QUANTITE);
        ApprovisionnementDTO approvisionnementDTO = approvisionnementMapper.toDto(updatedApprovisionnement);

        restApprovisionnementMockMvc
            .perform(
                put(ENTITY_API_URL_ID, approvisionnementDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(approvisionnementDTO))
            )
            .andExpect(status().isOk());

        // Validate the Approvisionnement in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedApprovisionnementToMatchAllProperties(updatedApprovisionnement);
    }

    @Test
    @Transactional
    void putNonExistingApprovisionnement() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        approvisionnement.setId(longCount.incrementAndGet());

        // Create the Approvisionnement
        ApprovisionnementDTO approvisionnementDTO = approvisionnementMapper.toDto(approvisionnement);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restApprovisionnementMockMvc
            .perform(
                put(ENTITY_API_URL_ID, approvisionnementDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(approvisionnementDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Approvisionnement in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchApprovisionnement() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        approvisionnement.setId(longCount.incrementAndGet());

        // Create the Approvisionnement
        ApprovisionnementDTO approvisionnementDTO = approvisionnementMapper.toDto(approvisionnement);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restApprovisionnementMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(approvisionnementDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Approvisionnement in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamApprovisionnement() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        approvisionnement.setId(longCount.incrementAndGet());

        // Create the Approvisionnement
        ApprovisionnementDTO approvisionnementDTO = approvisionnementMapper.toDto(approvisionnement);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restApprovisionnementMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(approvisionnementDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Approvisionnement in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateApprovisionnementWithPatch() throws Exception {
        // Initialize the database
        approvisionnementRepository.saveAndFlush(approvisionnement);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the approvisionnement using partial update
        Approvisionnement partialUpdatedApprovisionnement = new Approvisionnement();
        partialUpdatedApprovisionnement.setId(approvisionnement.getId());

        restApprovisionnementMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedApprovisionnement.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedApprovisionnement))
            )
            .andExpect(status().isOk());

        // Validate the Approvisionnement in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertApprovisionnementUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedApprovisionnement, approvisionnement),
            getPersistedApprovisionnement(approvisionnement)
        );
    }

    @Test
    @Transactional
    void fullUpdateApprovisionnementWithPatch() throws Exception {
        // Initialize the database
        approvisionnementRepository.saveAndFlush(approvisionnement);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the approvisionnement using partial update
        Approvisionnement partialUpdatedApprovisionnement = new Approvisionnement();
        partialUpdatedApprovisionnement.setId(approvisionnement.getId());

        partialUpdatedApprovisionnement.date(UPDATED_DATE).quantite(UPDATED_QUANTITE);

        restApprovisionnementMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedApprovisionnement.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedApprovisionnement))
            )
            .andExpect(status().isOk());

        // Validate the Approvisionnement in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertApprovisionnementUpdatableFieldsEquals(
            partialUpdatedApprovisionnement,
            getPersistedApprovisionnement(partialUpdatedApprovisionnement)
        );
    }

    @Test
    @Transactional
    void patchNonExistingApprovisionnement() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        approvisionnement.setId(longCount.incrementAndGet());

        // Create the Approvisionnement
        ApprovisionnementDTO approvisionnementDTO = approvisionnementMapper.toDto(approvisionnement);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restApprovisionnementMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, approvisionnementDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(approvisionnementDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Approvisionnement in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchApprovisionnement() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        approvisionnement.setId(longCount.incrementAndGet());

        // Create the Approvisionnement
        ApprovisionnementDTO approvisionnementDTO = approvisionnementMapper.toDto(approvisionnement);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restApprovisionnementMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(approvisionnementDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Approvisionnement in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamApprovisionnement() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        approvisionnement.setId(longCount.incrementAndGet());

        // Create the Approvisionnement
        ApprovisionnementDTO approvisionnementDTO = approvisionnementMapper.toDto(approvisionnement);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restApprovisionnementMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(approvisionnementDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Approvisionnement in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteApprovisionnement() throws Exception {
        // Initialize the database
        approvisionnementRepository.saveAndFlush(approvisionnement);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the approvisionnement
        restApprovisionnementMockMvc
            .perform(delete(ENTITY_API_URL_ID, approvisionnement.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return approvisionnementRepository.count();
    }

    protected void assertIncrementedRepositoryCount(long countBefore) {
        assertThat(countBefore + 1).isEqualTo(getRepositoryCount());
    }

    protected void assertDecrementedRepositoryCount(long countBefore) {
        assertThat(countBefore - 1).isEqualTo(getRepositoryCount());
    }

    protected void assertSameRepositoryCount(long countBefore) {
        assertThat(countBefore).isEqualTo(getRepositoryCount());
    }

    protected Approvisionnement getPersistedApprovisionnement(Approvisionnement approvisionnement) {
        return approvisionnementRepository.findById(approvisionnement.getId()).orElseThrow();
    }

    protected void assertPersistedApprovisionnementToMatchAllProperties(Approvisionnement expectedApprovisionnement) {
        assertApprovisionnementAllPropertiesEquals(expectedApprovisionnement, getPersistedApprovisionnement(expectedApprovisionnement));
    }

    protected void assertPersistedApprovisionnementToMatchUpdatableProperties(Approvisionnement expectedApprovisionnement) {
        assertApprovisionnementAllUpdatablePropertiesEquals(
            expectedApprovisionnement,
            getPersistedApprovisionnement(expectedApprovisionnement)
        );
    }
}
