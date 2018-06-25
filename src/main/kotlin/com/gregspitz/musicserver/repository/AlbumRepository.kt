package com.gregspitz.musicserver.repository

import com.gregspitz.musicserver.model.Album
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.rest.core.annotation.RepositoryRestResource

@RepositoryRestResource(path = "albums", collectionResourceRel = "albums")
interface AlbumRepository : JpaRepository<Album, Long>