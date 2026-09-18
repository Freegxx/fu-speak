package com.fuspeak.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.fuspeak.entity.Word;
import com.fuspeak.service.WordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/words")
public class WordController {

    @Autowired
    private WordService wordService;

    @GetMapping
    public Map<String, Object> list(
            @RequestParam(required = false) String bookId,
            @RequestParam(defaultValue = "1") Integer page,
            @RequestParam(defaultValue = "20") Integer size) {
        
        QueryWrapper<Word> wrapper = new QueryWrapper<>();
        if (bookId != null && !bookId.isEmpty()) {
            wrapper.eq("book_id", bookId);
        }
        
        Page<Word> pageParam = new Page<>(page, size);
        Page<Word> result = wordService.page(pageParam, wrapper);
        
        Map<String, Object> response = new HashMap<>();
        response.put("code", 200);
        response.put("msg", "success");
        response.put("data", result.getRecords());
        response.put("total", result.getTotal());
        return response;
    }

    @GetMapping("/{wordId}")
    public Map<String, Object> getByWordId(@PathVariable String wordId) {
        QueryWrapper<Word> wrapper = new QueryWrapper<>();
        wrapper.eq("word_id", wordId);
        Word word = wordService.getOne(wrapper);
        
        Map<String, Object> result = new HashMap<>();
        result.put("code", 200);
        result.put("msg", "success");
        result.put("data", word);
        return result;
    }

    @PostMapping
    public Map<String, Object> create(@RequestBody Word word) {
        wordService.save(word);
        
        Map<String, Object> result = new HashMap<>();
        result.put("code", 200);
        result.put("msg", "创建成功");
        result.put("data", word);
        return result;
    }

    @PutMapping("/{id}")
    public Map<String, Object> update(@PathVariable Long id, @RequestBody Word word) {
        word.setId(id);
        wordService.updateById(word);
        
        Map<String, Object> result = new HashMap<>();
        result.put("code", 200);
        result.put("msg", "更新成功");
        return result;
    }

    @DeleteMapping("/{id}")
    public Map<String, Object> delete(@PathVariable Long id) {
        wordService.removeById(id);
        
        Map<String, Object> result = new HashMap<>();
        result.put("code", 200);
        result.put("msg", "删除成功");
        return result;
    }

    @PostMapping("/batch")
    public Map<String, Object> batchCreate(@RequestBody List<Word> words) {
        wordService.saveBatch(words);
        
        Map<String, Object> result = new HashMap<>();
        result.put("code", 200);
        result.put("msg", "批量创建成功");
        return result;
    }
}
