package com.fuspeak.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.fuspeak.entity.WordBook;
import com.fuspeak.service.WordBookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/word-books")
public class WordBookController {

    @Autowired
    private WordBookService wordBookService;

    @GetMapping
    public Map<String, Object> list() {
        List<WordBook> books = wordBookService.list();
        Map<String, Object> result = new HashMap<>();
        result.put("code", 200);
        result.put("msg", "success");
        result.put("data", books);
        return result;
    }

    @GetMapping("/{bookId}")
    public Map<String, Object> getByBookId(@PathVariable String bookId) {
        QueryWrapper<WordBook> wrapper = new QueryWrapper<>();
        wrapper.eq("book_id", bookId);
        WordBook book = wordBookService.getOne(wrapper);
        
        Map<String, Object> result = new HashMap<>();
        result.put("code", 200);
        result.put("msg", "success");
        result.put("data", book);
        return result;
    }

    @PostMapping
    public Map<String, Object> create(@RequestBody WordBook wordBook) {
        wordBookService.save(wordBook);
        
        Map<String, Object> result = new HashMap<>();
        result.put("code", 200);
        result.put("msg", "创建成功");
        result.put("data", wordBook);
        return result;
    }

    @PutMapping("/{id}")
    public Map<String, Object> update(@PathVariable Long id, @RequestBody WordBook wordBook) {
        wordBook.setId(id);
        wordBookService.updateById(wordBook);
        
        Map<String, Object> result = new HashMap<>();
        result.put("code", 200);
        result.put("msg", "更新成功");
        return result;
    }

    @DeleteMapping("/{id}")
    public Map<String, Object> delete(@PathVariable Long id) {
        wordBookService.removeById(id);
        
        Map<String, Object> result = new HashMap<>();
        result.put("code", 200);
        result.put("msg", "删除成功");
        return result;
    }
}
