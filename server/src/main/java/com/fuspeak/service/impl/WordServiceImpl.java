package com.fuspeak.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.fuspeak.entity.Word;
import com.fuspeak.mapper.WordMapper;
import com.fuspeak.service.WordService;
import org.springframework.stereotype.Service;

@Service
public class WordServiceImpl extends ServiceImpl<WordMapper, Word> implements WordService {
}
