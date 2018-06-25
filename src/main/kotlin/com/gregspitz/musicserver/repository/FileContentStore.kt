package com.gregspitz.musicserver.repository

import com.gregspitz.musicserver.model.File
import org.springframework.content.commons.repository.ContentStore
import org.springframework.content.rest.StoreRestResource

@StoreRestResource
interface FileContentStore : ContentStore<File, String>