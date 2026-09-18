package com.fuspeak.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@TableName("word")
public class Word {
    
    @TableId(type = IdType.AUTO)
    private Long id;
    
    private String wordId;
    private String word;
    private String phoneticUk;
    private String phoneticUs;
    private String definitionCn;
    private String definitionEn;
    private String examples;
    private String bookId;
    
    @TableField(fill = FieldFill.INSERT)
    private LocalDateTime createdAt;
    
    @TableField(fill = FieldFill.INSERT_UPDATE)
    private LocalDateTime updatedAt;
    
    @TableLogic
    private Integer deleted;
}
