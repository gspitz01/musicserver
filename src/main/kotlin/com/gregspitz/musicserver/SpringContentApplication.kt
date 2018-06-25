package com.gregspitz.musicserver

import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication

@SpringBootApplication
open class SpringContentApplication

fun main(args: Array<String>) {
    SpringApplication.run(SpringContentApplication::class.java, *args)
}

