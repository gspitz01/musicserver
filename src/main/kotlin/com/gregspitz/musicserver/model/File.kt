package com.gregspitz.musicserver.model

import org.springframework.content.commons.annotations.ContentId
import org.springframework.content.commons.annotations.ContentLength
import org.springframework.content.commons.annotations.MimeType
import java.util.*
import javax.persistence.*

@Entity
@Table(name = "Files")
data class File(@Id @GeneratedValue(strategy = GenerationType.AUTO) var id: Long = 0,
                var name: String = "", var date: Date = Date(), var summary: String = "",
                @ContentId var contentId: String = "", @ContentLength var contentLength: Long = 0,
                @MimeType var mimeType: String = "text/plain")