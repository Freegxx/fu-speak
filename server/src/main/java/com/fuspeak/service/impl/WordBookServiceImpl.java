package com.fuspeak.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.fuspeak.entity.WordBook;
import com.fuspeak.mapper.WordBookMapper;
import com.fuspeak.service.WordBookService;
import org.springframework.stereotype.Service;

@Service
public class WordBookServiceImpl extends ServiceImpl<WordBookMapper, WordBook> implements WordBookService {
}
