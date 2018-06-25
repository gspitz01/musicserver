package com.gregspitz.musicserver.model

import javax.persistence.*

@Entity
@Table(name = "Albums")
data class Album(@Id @GeneratedValue(strategy = GenerationType.AUTO) var id: Long = 0,
                 var name: String = "", @ElementCollection var fileIds: List<String> = ArrayList())