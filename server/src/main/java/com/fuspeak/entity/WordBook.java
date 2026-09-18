package com.fuspeak.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@TableName("word_book")
public class WordBook {
    
    @TableId(type = IdType.AUTO)
    private Long id;
    
    private String bookId;
    private String name;
    private String description;
    private String icon;
    private Integer wordCount;
    private Boolean isPersonal;
    
    @TableField(fill = FieldFill.INSERT)
    private LocalDateTime createdAt;
    
    @TableField(fill = FieldFill.INSERT_UPDATE)
    private LocalDateTime updatedAt;
    
    @TableLogic
    private Integer deleted;
}
